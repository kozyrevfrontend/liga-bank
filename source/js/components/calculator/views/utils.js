export function renderElement(parentElement, template, place = `beforeend`) {
  parentElement.insertAdjacentHTML(place, template);
}

export function deleteChildrenElements(list) {
  while (list.firstChild) {
    list.removeChild(list.firstChild);
  }
}
