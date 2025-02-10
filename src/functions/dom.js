
/**
 * Create new html element with given tag and attributes
 * @param {string} tag 
 * @param {object} attributes 
 * @param {string} text
 * @returns {HTMLElement}
 */
export function createElement(tag, attributes, text) {

    const element = document.createElement(tag)
    for (const [attribute, value] of Object.entries(attributes)) {
        if (value != null) {
            element.setAttribute(attribute, value)
        }
    }
    if (text != undefined) {
        element.innerText = text
    }
    return element
}

export function cloneTemplate(element, id) {
    return element.append(document.getElementById(id).content.cloneNode(true))
}