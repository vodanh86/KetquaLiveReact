export const number_format = (number, decimals, dec_point, thousands_sep) => {
    // Strip all characters but numerical ones.
    number = (number + '').replace(/[^0-9+\-Ee.]/g, '');
    let n = !isFinite(+number) ? 0 : +number,
        prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
        sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
        dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
        s = '',
        toFixedFix = function (n, prec) {
            let k = Math.pow(10, prec);
            return '' + Math.round(n * k) / k;
        };
    // Fix for IE parseFloat(0.55).toFixed(0) = 0;
    s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
    if (s[0].length > 3) {
        s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
    }
    if ((s[1] || '').length < prec) {
        s[1] = s[1] || '';
        s[1] += new Array(prec - s[1].length + 1).join('0');
    }
    return s.join(dec);
};

export const remove_array_values = (data, values) => {
    if(typeof data === 'object' && data.length > 0){
        let filtered = data;
        for(let i=0;i<values.length;i++){
            filtered = data.filter(function(value, index, arr){
                return (values[i].toString() !== value.toString());
            });
        }
        return filtered;
    }else{
        return [];
    }
};

export const valid_phone = (phone) => {
    //TODO validate phone number
    if(phone === null || phone === undefined || phone.length < 9 || phone.length > 15){
        return false;
    }else{
        return true;
    }
};