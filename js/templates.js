export let env = new nunjucks.Environment();

env.addFilter('getPythonClass', function(struct) {
    return struct.getPythonClass();
});

env.addFilter('getGoStruct', function(struct) {
    return struct.getGoStruct();
});

env.addFilter('getPythonType', function(attr) {
    return attr.getPythonType();
});

env.addFilter('getGoType', function(attr) {
    return attr.getGoType();
});


export const goTemplate = `
{% for struct in structs %}
{{struct | getGoStruct }}
{% endfor %}
    `;

export const pyTemplate=`
{% for class in classes %}
{{class | getPythonClass }}
{% endfor %}
`

export const pyClassTemplate=`
class {{ class.name }}:
    {% for attr in class.attributes %}
    {{ attr.name }}:{{ attr | getPythonType }}
    {% endfor %}
`

export const goStructTemplate=`
type {{ struct.name }} struct {
{% for attr in struct.attributes %}
    {{ attr.name }} {{ attr | getGoType }}
{% endfor %}
}
`