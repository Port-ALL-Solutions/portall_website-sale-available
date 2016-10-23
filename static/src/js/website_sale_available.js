$(document).ready(function () {
    if (! $('#cart_products') )
        return;

    var input_selector = 'input[data-product-id]';

    function check(el){
        if (!el)
            el = input_selector;

        var available = true;
        $(el).each(function(){
            var quantity =  parseInt($(this).val());
            $tr = $(this).parent().parent().parent();
            //$tr1 = $(this).parent().parent().parent( ".product" );
            var virtual_available = parseInt($tr.find('[name="virtual_available"]').text())
            //var virtual_available1 = parseInt($tr1.find('[name="virtual_available"]').text())
            var enough = quantity <= virtual_available
            //var enough1 = quantity <= virtual_available1
            $tr.toggleClass('warning', !enough);
            //$tr1.toggleClass('warning', !enough1);
            if (!enough)
                available = false;

        })
        $('a[href="/shop/checkout"]').toggleClass('disabled', !available);
    }
    
    $(input_selector).on('change', function(){
        check(this)
    })

    check();

})

