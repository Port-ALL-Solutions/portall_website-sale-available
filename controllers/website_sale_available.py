# -*- coding: utf-8 -*-
import logging
from openerp import SUPERUSER_ID
from openerp import http
from openerp.http import request
from openerp.tools.translate import _

from openerp.addons.website_sale.controllers.main import website_sale

_logger = logging.getLogger(__name__)

class controller(website_sale):

    @http.route(['/shop/confirm_order'], type='http', auth="public", website=True)
    def confirm_order(self, **post):
        res = super(controller, self).confirm_order(**post)

        order = request.website.sale_get_order(context=request.context)
        _logger.info('Entcart %s', order)
        for line in order.order_line:
            if line.product_id.type != 'service' and line.product_uom_qty > line.product_id.virtual_available:
                return request.redirect("/shop/cart")

        return res
