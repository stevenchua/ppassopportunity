$(document).ready(function(){
    var $cache = {
    		markets  : $("#markets"),
    		marketsClones : $('#marketsClones'),
    		referencelinks : $('#references-link'),
    		reference : $('.references:first-child'),
    		usecaselist : $('#usecase-list'),
    		usecase : $('.usecase:first-child'),
            capabilitieswrapper : $('#capabilities-wrapper'),
            capabilities : $('.capabilities:first-child'),
    };
    $("[data-toggle='tooltip']").tooltip();
	$('#dp3').datepicker();
    $("#submit-opportunity").validate();
   
    $('#collapseFour').on('shown.bs.collapse', function () {
        $(".range").ionRangeSlider({
             values: [
                "Low", "Medium","High"
            ],
            type: 'single',
            hasGrid: false
        });
    });
    
    function joinValues (domarray){
        var values = [];
        $.each(domarray, function( index, value ) {
            values.push($(this).val());
        });
        return  values.join(',');
    }

    //Form Event
    $('.submit-opportunity')

    //ADD  Markets
    .on('click', '#add-markets', function(e){
    	$cache.marketsClones.append($cache.markets.find("option:selected"));
        $('.usecase:last').find('input, select, textarea').val('');
    })

    //Remove  Markets
    .on('click', '#remove-markets', function(e){
    	$cache.markets.append($cache.marketsClones.find("option:selected"));
    	var sel = $cache.markets.get(0),
        opts = [];

	    // Extract the elements into an array
	    for (var i=sel.options.length-1; i >= 2; i--)
	        opts.push(sel.removeChild(sel.options[i]));
	
	    // Sort them
	    opts.sort(function (a, b) { 
	        return a.innerHTML.localeCompare(b.innerHTML);
	    });
	
	    // Put them back into the <select>
	    while(opts.length)
	        sel.appendChild(opts.shift());
    })

    //Add reference
    .on('click','#add-reference', function (e) {
    	e.preventDefault();
    	var html = '';
    	$cache.referencelinks.append($cache.reference.clone());
        $('.references:last').find('input, select, textarea').val('');
    })

    .on('click','.remove-reference', function (e) {
    	e.preventDefault();
    	if($('.references').length >= 2){
    		$(this).parent().remove();
    	}
    })

     //Add reference
    .on('click','#add-usecase', function (e) {
    	e.preventDefault();
    	$cache.usecaselist.append($cache.usecase.clone());
        $('.usecase:last').find('input, select, textarea').val('');
    })

    //Remove Case
    .on('click','.remove-usecase', function (e) {
    	e.preventDefault();
    	if($('.usecase').length >= 2){
    		$(this).parents('.usecase').remove();
    	}
    	
    })

    .on('click','.remove-capabilities', function (e) {
        e.preventDefault();
        if($('.capabilities').length >= 2){
            $(this).parent().remove();
        }
    })

     //Add reference
    .on('click','#add-capabilities', function (e) {
        e.preventDefault();
        $cache.capabilitieswrapper.append($cache.capabilities.clone());
    })

    //Submit Form
    .on('submit', function  (e) {
    	e.preventDefault();
    	if($("#submit-opportunity").valid()){

            var form = $("#submit-opportunity");

            var postdata = {
                customer                :           form.find('[name="customer"]').val(),
                deadline                :           form.find('[name="deadline"]').val(),
                description             :           form.find('[name="description"]').val(),
                enps_range              :           form.find('[name="enps_range"]').val(),
                enps_value              :           form.find('[name="enps_value"]').val(),
                markets                 :           joinValues(form.find('[name="markets"]')),
                opportunityname         :           form.find('[name="opportunityname"]').val(),
                owner                   :           form.find('[name="owner"]').val(),
                reference_title         :           joinValues(form.find('[name="reference_title"]')),
                reference_url           :           joinValues(form.find('[name="reference_url"]')),
                roi_range               :           form.find('[name="roi_range"]').val(),
                roi_value               :           form.find('[name="roi_value"]').val(),
                strategy_range          :           form.find('[name="strategy_range"]').val(),
                strategy_value          :           form.find('[name="strategy_value"]').val(),
                tvp_range               :           form.find('[name="tvp_range"]').val(),
                tvp_value               :           form.find('[name="tvp_value"]').val(),
                usecase_doessomething   :           joinValues(form.find('[name="usecase_doessomething"]')),
                usecase_person          :           joinValues(form.find('[name="usecase_person"]')),
                usecase_toachieve       :           joinValues(form.find('[name="usecase_toachieve"]')),
                cps                     :           form.find('[name="cps"]').val(),
                policy1                 :           form.find('[name="policy1"]').val(),
                policy2                 :           form.find('[name="policy2"]').val(),
                policy3                 :           form.find('[name="policy3"]').val(),
                policy4                 :           form.find('[name="policy4"]').val(),
                policy5                 :           form.find('[name="policy5"]').val(),
                policy6                 :           form.find('[name="policy6"]').val(),
            };
            
            function getActualRange (range) {
                if(range == 0){
                    return 1;
                }else if(range == 1){
                    return 5;
                }else if(range == 2){
                    return 10;
                }else{
                    console.log('Invalid Range' + range);
                }
            }
            postdata.roi_range      = getActualRange(postdata.roi_range);
            postdata.tvp_range     = getActualRange(postdata.tvp_range);
            postdata.strategy_range = getActualRange(postdata.strategy_range);

            var total_range = postdata.roi_range + postdata.tvp_range + postdata.strategy_range;        

            postdata.rank = Math.ceil(total_range/3); 

                var capabilities_area = [];
          
 
           $.each($("#submit-opportunity").find('[name="capabilities_area"]'), function( index, value ) {
                capabilities_area.push($(this).val().join(','));
           });
           postdata.capabilities_area = capabilities_area.join('|');
           //console.log(postdata);

    		$.post( "/postform",postdata)
			.done(function( data ) {
				$('#success-response').removeClass('hide');
                $('#submit-form').hide();
			});
    	}
    	
    });
});