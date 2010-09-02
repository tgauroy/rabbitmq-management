UNKNOWN_REPR = '<span class="unknown">?</span>';

function fmt_string(str) {
    if (str == undefined) return UNKNOWN_REPR;
    return str;
}

function fmt_num(num) {
    if (num == undefined) return UNKNOWN_REPR;
    return num.toFixed(0);
}

function fmt_bytes(bytes) {
    if (bytes == undefined) return UNKNOWN_REPR;

    function f(n, p) {
        if (n > 1024) return f(n / 1024, p + 1);
        else return [n, p];
    }

    var num_power = f(bytes, 0);
    var num = num_power[0];
    var power = num_power[1];
    var powers = ['B', 'kB', 'MB', 'GB', 'TB'];
    return (power == 0 ? num.toFixed(0) : num.toFixed(1)) + powers[power];
}

function fmt_boolean(b) {
    if (b == undefined) return UNKNOWN_REPR;

    return b ? "&#9679;" : "&#9675;";
}

function fmt_color(r) {
    if (r == undefined) return '';

    if (r > 0.75) return 'red';
    else if (r > 0.5) return 'yellow';
    else return 'green';
}

function fmt_rate(obj, name) {
    return fmt_rate0(obj, name, fmt_num);
}

function fmt_rate_bytes(obj, name) {
    return fmt_rate0(obj, name, fmt_bytes);
}

function fmt_rate0(obj, name, fmt) {
    if (obj == undefined || obj[name] == undefined) return '';
    var res = '<sub>(' + fmt(obj[name]) + ' total)</sub>';
    if (obj[name + '_details'] != undefined) {
        res = fmt(obj[name + '_details'].rate) + '/s' + res;
    }
    return res;
}

function fmt_exchange(name) {
    return name == '' ? '<i>(AMQP default)</i>' : name;
}

function fmt_exchange_url(name) {
    return name == '' ? 'amq.default' : name;
}

function alt_rows(i) {
    return (i % 2 == 0) ? ' class="alt"' : '';
}

function esc(str) {
    return escape(str).replace(/\//g, '%2F').replace(/\+/g, '%2B');
}

function link_conn(name) {
    return link_to(name, '#/connections/' + esc(name))
}

function link_exchange(vhost, name) {
    var url = esc(vhost) + '/' + (name == '' ? 'amq.default' : esc(name));
    return link_to(fmt_exchange(name), '#/exchanges/' + url)
}

function link_queue(vhost, name) {
    return link_to(name, '#/queues/' + esc(vhost) + '/' + esc(name))
}

function link_vhost(name) {
    return link_to(name, '#/vhosts/' + esc(name))
}

function link_user(name) {
    return link_to(name, '#/users/' + esc(name))
}

function link_to(name, url) {
    return '<a href="' + url + '">' + name + '</a>';
}