export let env = new nunjucks.Environment();

env.addFilter('getPythonClass', function(struct) {
    return struct.getPythonClass();
});

env.addFilter('getGoStruct', function(struct) {
    return struct.getGoStruct();
});

env.addFilter('getPythonFunction', function(func) {
    return func.getPythonFunction();
});

env.addFilter('getGoFunction', function(func) {
    return func.getGoFunction();
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

{% for func in functions %}
{{func | getGoFunction }}
{% endfor %}
`;

export const goStructTemplate=`
type {{ struct.name }} struct {
{% for attr in struct.attributes %}
    {{ attr.name }} {{ attr | getGoType }}
{% endfor %}
}
`

export const goFuncTemplate = `
func {{name}}({{paramText}}) {{returnTypeText}}{
    // Function body here
}
`

export const pyTemplate=`
{% for class in classes %}
{{class | getPythonClass }}
{% endfor %}

{% for func in functions %}
{{func | getPythonFunction | safe }}
{% endfor %}
`

export const pyClassTemplate=`
@dataclass
class {{ class.name }}:
    {% for attr in class.attributes %}
    {{ attr.name }}:{{ attr | getPythonType }}
    {% endfor %}
`

export const pyFunctionTemplate = `
def {{name}}({{paramText}}){{returnTypeText}}:
    ... # Function body here
`


// UI templates

export const functionUI = `
<article id="func-{{functionId}}">
    <div class="function-bar">
        <div id="func-name-{{functionId}}">{{functionLabel}}</div>
        <button data-id="{{functionId}}" class="remove-func" style="background:transparent;border-color:transparent;">❌</button>
    </div>

    <form id="func-data-{{functionId}}" action="">
        <input id="func-name-input-{{functionId}}" value="MyFunc" type="text" name="name" placeholder="Function Name" required="">
        <small>If your function doesn't start with a capital, Go will consider it to be private</small>
        <article>
            <details><summary>Parameters</summary>
                <fieldset id="func-parameters-{{functionId}}">
                    <div class="parameter">
                        <input type="text" name="name" placeholder="Parameter Name" value="myParameter">
                        <select name="type" aria-label="Select" required="">
                            <option disabled="" value="">Select Parameter Type</option>
                            <option selected="" value="string">String</option>
                            <option value="int">Int</option>
                            <option value="float">Float</option>
                            <option value="array">Array</option>
                        </select>
                    </div>
                    <hr>
                </fieldset>
                <button data-id="{{functionId}}" class="add-param" type="button">+ Add Parameter</button>
            </details>
        </article>
    </form>
</article>

`

