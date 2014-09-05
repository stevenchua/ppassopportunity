	var asInitVals = new Array();
	$(document).ready(function() {
	    var oTable = $('#datatable-opportunities').dataTable( {
			"bProcessing": true,
			"bServerSide": true,
			"sAjaxSource": "/datatables",
		    "bAutoWidth": false,
		    "columns": [	
		      
		      { "name": "opportunityname" },
		      { "name": "description" },	   
		      { "name": "owner" },
		      {"name": "Relevant_APIs_and_capabilities"},
		      {"name" : "PPaaS_Status"},
		      { "name": "rank" },
		      { "name": "id" }		      
		    ]
	   } );

	  $(".searchfilter input").keyup( function () {
	    /* Filter on the column (the index) of this element */
	    oTable.fnFilter( this.value, $(".searchfilter input").index(this) );
	  } );  
	  /*
	   * Support functions to provide a little bit of 'user friendlyness' to the textboxes in 
	   * the footer
	   */
	  $(".searchfilter input").each( function (i) {
	    asInitVals[i] = this.value;
	  } );
	  
	  $(".searchfilter input").focus( function () {
	    if ( this.className == "search_init" )
	    {
	      this.className = "";
	      this.value = "";
	    }
	  } );
	  
	  $(".searchfilter input").blur( function (i) {
	    if ( this.value == "" )
	    {
	      this.className = "search_init";
	      this.value = asInitVals[$(".searchfilter input").index(this)];
	    }
	  } );

	  $('.dataTables_wrapper').on('click', 'table.dataTable tbody tr td:first', function  (e) {
	  	e.preventDefault();
	  	var id = $(this).parent().children(':last').text();
	  	$('#myModal').modal({"remote" : "/view/id/"+id});
	  });
		
	});
	