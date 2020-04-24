function renderDom(tagName, attributesSet) {
  const dom = document.createElement(tagName);
  if (attributesSet && typeof attributesSet === 'object') {
    for (let [attributeName, attributeValue] of Object.entries(attributesSet)) {
      if (!attributeValue) continue;
      switch (attributeName) {
        case 'class': 
        case 'className': dom.classList.add(attributeValue);break;
        case 'text':
        case 'textContent': dom.textContent = attributeValue; break;
        case 'children': appendChildren(dom, attributeValue); break;
        default: dom.setAttribute(attributeName, attributeValue); break;
      }
    }
  }
  return dom;
}

function appendChildren(dom, childrenList) {
  for (let child of childrenList) {
    dom.appendChild(child);
  }
}