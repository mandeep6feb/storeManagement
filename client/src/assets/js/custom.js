$(function() {



        $('#main-Nav li a, .submenu li a').each(function(){


            $(this).click(function(){


                $getMenuID = $(this).attr('data-attr');


                if($getMenuID){

              //  alert($getMenuID);

               $(this).parents('#main-Nav, .submenu').hide();

               
               $('#'+$getMenuID).show();


                }


            })


        })



        $('.back, .menu').click(function(){


            $('.submenu').hide();

            $('#main-Nav').show();




        })
			
		

            $('select').each( function(){

                console.log($(this).val())

            } );

          //  var current_val = $(".custom-control").val();

         //   $(".value").text(current_val);

            $(".custom-control").change(function(){
           

                var select_val = $(this).val();

                $(this).parent().find('.value').text(select_val);

               

            });


            var top_gap = $('.site-control').height()   ;

            $('.product-slider, .page-wrapper').css({marginTop:top_gap+'px'});

            $('.page-wrapper').css({marginTop:top_gap+50+'px', marginBottom:top_gap/2+'px'});

            var doc_width = $(window).width();

            if(doc_width <= 600){

                
div1 = jQuery('.div-left');
	div2 = jQuery('.div-right');
	
	tdiv1 = div1.clone();
	tdiv2 = div2.clone();
	
	if(!div2.is(':empty')){
		div1.replaceWith(tdiv2);
		div2.replaceWith(tdiv1);	  
	}

    
            }




            $('#slider-rev').slick({
                infinite: true,
                dots: true,
                fade: true,


            });


            $('.menu').click(function() {






                $('#nav').toggleClass('reveal');


                if ($('#nav').hasClass('reveal')) {


                    $('#nav').addClass('reveal');
                    $('#nav').removeClass('unreveal');

                    $('.site-control').css({
                        paddingRight: '0px'
                    })

                    $('body').addClass('scroll-reveal');

                    $('.icon-menu span').addClass('active');





                } else {
                    $('.site-control').css({
                        paddingRight: '0px'
                    });
                    $('#nav').addClass('unreveal');
                    $('.site-control').css({
                        paddingRight: '0'
                    });
                    $('body').removeClass('scroll-reveal');
                    $('.icon-menu span').removeClass('active');
                }



                return false;

            });





        })


        $(window).scroll(function() {


            var window_position = $('html').scrollTop();

            var document_height = $(window).height();

            $('.feature-header').each(function() {



                var heading_pos = $(this).offset().top - document_height + 100;

                if (window_position >= heading_pos) {

                    $(this).addClass('feature-header--visible');

                }




            });





        });
