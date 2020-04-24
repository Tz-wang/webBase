class Node {
  constructor(text, geometry, parent=null) {
    const dom = renderDom('div', {className: 'node', text});
    dom.style.position = 'absolute';
    dom.style.top = geometry.y + 'px';
    dom.style.left = geometry.x + 'px';
    dom.style.width = geometry.w + 'px';
    dom.style.height = geometry.h + 'px';
    const positionSetList = [];
    const resetPosition = () => {
      if (positionSetList.length > 0) {
        const position = {}
        positionSetList.forEach(item => {
          for (let [key, val] of Object.entries(item)) {
            position[key] = val;
          }
        })
        dom.style.top = position.y + 'px';
        dom.style.left = position.x + 'px';
        dom.style.width = position.w + 'px';
        dom.style.height = position.h + 'px';
        positionSetList.length = 0;
      }
      window.requestAnimationFrame(resetPosition);
    }
    resetPosition();
    this.geometry = new Proxy(geometry, {
      set(obj, prop, value) {
        positionSetList.push({[prop]: value});
        obj[prop] = value;
        return true;
      }
    })
    const self = this;
    const moveStart = evt => {
      window.event ? window.event.cancelBubble = true : evt.stopPropagation();
      
      const {offsetX, offsetY} = evt;
      const moving = evt => {
        const {clientX, clientY} = evt;
        self.geometry.x = clientX - offsetX;
        self.geometry.y = clientY - offsetY;
      }
      const moveEnd = evt => {
        window.removeEventListener('mousemove', moving);
        window.removeEventListener('mouseup', moveEnd);
      }
      window.addEventListener('mousemove', moving);
      window.addEventListener('mouseup', moveEnd);
    }
    dom.addEventListener('mousedown', moveStart);
    if (parent) {
      if (typeof parent === 'string') {
        document.getElementById(parent).appendChild(dom);
      } else {
        parent.appendChild(dom);
      }
    } else {
      document.body.appendChild(dom);
    }
    this._dom = dom;
  }
}