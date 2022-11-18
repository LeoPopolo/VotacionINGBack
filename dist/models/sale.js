"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseSaleItems = void 0;
function parseSaleItems(items) {
    let response = 'array[';
    for (let item of items) {
        const image_path = item.image ? `'${item.image}'` : null;
        response += `(${item.id}, '${item.name}', '${item.description}', ${item.price}, ${item.stock}, brand_identify_by_id(${item.brand.id}), ${item.quantity}, ${image_path}),`;
    }
    response = response.substring(0, response.length - 1);
    response += ']::sale_item[]';
    return response;
}
exports.parseSaleItems = parseSaleItems;
//# sourceMappingURL=sale.js.map