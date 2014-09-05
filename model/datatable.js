var sTable = 'opportunity';
var sIndexColumn = '*';
var connection = require('../model/model.js');
var cache_data = {};
var aColumns = [];

var datatable = {
server : function (res, request) { 
  /**
   * Paging
   */
   var sLimit = "LIMIT 10 0";
   if(request['iDisplayStart'] && request['iDisplayLength'] != -1) {
    sLimit = 'LIMIT ' +request['iDisplayStart']+ ', ' +request['iDisplayLength']
  }
  
   /**
   * sColumns
   */

  if(request['sColumns'] && request['sColumns'] != '') {
    aColumns = request['sColumns'].split(',');
  }  
  /**
   * Ordering
   */
   var sOrder = "";
   if(request['iSortCol_0']) {
    sOrder = 'ORDER BY ';

    for(var i = 0 ; i < request['iSortingCols']; i++) {
      if(request['bSortable_'+parseInt(request['iSortCol_'+i])] == "true") {
        sOrder += aColumns[parseInt(request['iSortCol_'+i])] +" "+ request['sSortDir_'+i] +", ";
      }
    }
    
    sOrder = sOrder.substring(0, sOrder.length -2)
    if(sOrder == 'ORDER BY') {
      //console.log("sOrder == ORDER BY");
      sOrder = "";
    }
  }

  /**
   * Filtering
   */
   var sWhere = "";
   if(request['sSearch'] && request['sSearch'] != "") {
    sWhere = "WHERE (";
      for(var i=0 ; i<aColumns.length; i++) {
        sWhere += aColumns[i]+ " LIKE " +"\'%"+request['sSearch']+"%\'"+" OR ";
      }

      sWhere = sWhere.substring(0, sWhere.length -4);
      sWhere += ')';
  }

  /**
   * column filtering
   */
   for(var i=0 ; i<aColumns.length; i++) {
    if(request['bSearchable_'+i] && request['bSearchable_'+i] == "true" && request['sSearch_'+i] != '') {
      if(sWhere == "") {
        sWhere = "WHERE ";
      } else {
        sWhere += " AND ";
      }
      sWhere += " "+aColumns[i]+ " LIKE " +"\'%"+request['sSearch_'+i]+"%\'"+" ";
    }
  }
  
  /**
   * Queries
   */
   var sQuery = "SELECT SQL_CALC_FOUND_ROWS " +aColumns.join(',')+ " FROM " +sTable+" "+sWhere+" "+sOrder+" "+sLimit +"";

   var rResult = {};
   var rResultFilterTotal = {};
   var aResultFilterTotal = {};
   var iFilteredTotal = {};
   var iTotal = {};
   var rResultTotal = {};
   var aResultTotal = {};

  //Log the query for debugging
  //console.log(sQuery);

  connection.query(sQuery, function selectCb(err, results, fields) {
    if(err) {
      console.log(err);
    }
    
    rResult = results;

    /**
     * Data set length after filtering
     */
     sQuery = "SELECT FOUND_ROWS()";

     connection.query(sQuery, function selectCb(err, results, fields) {
      if(err) {
        console.log(err);
      }
      rResultFilterTotal = results;
      aResultFilterTotal = rResultFilterTotal;
      iFilteredTotal = aResultFilterTotal[0]['FOUND_ROWS()'];

      /**
       * Total data set length
       */
       sQuery = "SELECT COUNT("+sIndexColumn+") FROM " +sTable;

       connection.query(sQuery, function selectCb(err, results, fields){
        if(err){
          console.log(err);
        }
        rResultTotal = results;
        aResultTotal = rResultTotal;
        iTotal = aResultTotal[0]['COUNT(*)'];

        /**
         * Create Output
         */
         var output = {};
         var temp = [];

         output.sEcho = parseInt(request['sEcho']);
         output.iTotalRecords = iTotal;
         output.iTotalDisplayRecords = iFilteredTotal;
         output.aaData = [];

         var aRow = rResult;
         var row = [];

         for(var i in aRow)
         {
          for(Field in aRow[i])
          {
            if(!aRow[i].hasOwnProperty(Field)) continue; 
            temp.push(aRow[i][Field]);
          }
          output.aaData.push(temp);
          temp = [];
        }
        
        /**
         * Send respons as json
         */
         res.json(200, output);
       });
     });
}); 
}

}
module.exports = datatable;