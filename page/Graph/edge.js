function Edge(node1, node2) {
  const self = this;
  const dom = renderDom('canvas', {className: 'edge'})
  dom.style.position = 'absolute';
  this.geometry = new Proxy({}, {
    get(obj, prop) {
      switch (prop) {
        case 'x': return Math.min(node1.geometry.x + node1.geometry.w / 2, node2.geometry.x + node2.geometry.w / 2);
        case 'y': return Math.min(node1.geometry.y + node1.geometry.h, node2.geometry.y + node1.geometry.h);
        case 'w': return Math.abs(node1.geometry.x - node2.geometry.x);
        case 'h': return Math.abs(node1.geometry.y - node2.geometry.y) - (((node1.geometry.y - node2.geometry.y) > 0) ? node1.geometry.h : node2.geometry.h);
        default: throw new Error('has not this prop');
      }
    }
  })
  
  this.ctx = dom.getContext('2d');
  const resetGeometry = () => {
    dom.style.top = self.geometry.y + 'px';
    dom.style.left = self.geometry.x + 'px';
    dom.style.width = self.geometry.w + 'px';
    dom.style.height = self.geometry.h + 'px';
    dom.width = self.geometry.w;
    dom.height = self.geometry.h;
    self.ctx.beginPath();
    self.ctx.moveTo(0, 0);

    self.ctx.bezierCurveTo(0, self.geometry.h / 2, self.geometry.w, self.geometry.h / 2, self.geometry.w, self.geometry.h);
    self.ctx.stroke();
    window.requestAnimationFrame(resetGeometry);
  }
  resetGeometry();
  document.body.appendChild(dom);
}