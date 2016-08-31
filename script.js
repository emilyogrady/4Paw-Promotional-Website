$(document).ready(function(){
    console.log('The song "MMMBop" by Hanson has been stuck in my head for weeks now. Please help me.');
    $('.learn-more-btn').on('click', next);
    $('.prev-btn').on('click', prev);
    $('.next-btn').on('click', next);

    var $content = $('#share-options').detach();
    $('.submit-btn').on('click', function(e){
        e.preventDefault();
        
        var fields = $('.form-fields');
        var fields_missing = false;
        
        fields.each(function(i, o){
            var field = $(o);
            field = field.val();
                if (field == '') {
                    fields_missing = true;   
                }
            
            console.log(field);
        });
        
        console.log(fields_missing);
        
        if (fields_missing == true) { 
            $('#input-message').text('Please write in all fields.');  
        } else {
            $('#input-message').text('');
            modal.open({content: $content, width:795, height:598});  
        };
    });
});

var landing = $('#landing')
var current_panel = $('.panel.active');
var next_btn = $('.next-btn');
var prev_btn = $('.prev-btn');
var submit_btn = $('.submit-btn');
var fields = $('.form-fields');


function prev(e){
    var current = $('.panel.active');
    current.removeClass('active').prev().addClass('active');
    next_btn.removeClass('hide').addClass('active');
    prev_btn.removeClass('hide').addClass('active');
    submit_btn.removeClass('active').addClass('hide');
    
    if ($('#landing').hasClass('active')) {
        next_btn.addClass('hide').removeClass('active');
        prev_btn.addClass('hide').removeClass('active');
    } 
    
}

function next(e){
    var current = $('.panel.active');
    current.removeClass('active').next().addClass('active');
    next_btn.removeClass('hide').addClass('active');
    prev_btn.removeClass('hide').addClass('active');
    submit_btn.removeClass('active').addClass('hide');
    
    if ($('#donation').hasClass('active')) {
        next_btn.addClass('hide').removeClass('active');
        submit_btn.removeClass('hide').addClass('active');
    } 
}

function submit(e){
    e.preventDefault();
    
    if ($('input').val() > 0) {
        $('.modal').removeClass('hide');
    } else {
        $('#input-message').text('Please write in all fields.');
    }
}

var modal = (function() {
    var $window = $(window);
    var $modal = $('<div class="modal" />');
    var $content = $('<div class="modal-content" />');
    var $close = $('<a class="close-btn modal-close" href="#"><img src="images/close-btn.svg" /></a>');
    
    $modal.append($content);
    

    
    $close.on('click', function(e) {
        e.preventDefault();
        modal.close();
    });
    
    return {
        center: function() {
            var top = Math.max($window.height() - $content.outerHeight(), 0) / 2;
            var left = Math.max($window.width() - $content.outerWidth(), 0) / 2;
           $content.css({
               top: top + $window.scrollTop(),
               left: left + $window.scrollLeft()
           });
        },
        open: function(settings) {
            $content.empty().append(settings.content);
            
            $content.css({
                width: settings.width || 'auto',
                height: settings.height || 'auto'
            });
            $content.append($close);
            
            $modal.appendTo('body');
            
            modal.center();
            $(window).on('resize', modal.center);
        },
        close: function() {
            $content.empty();
            $modal.detach();
            $(window).off('resize', modal.center);
        }
    };
}());

