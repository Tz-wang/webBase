function Edge(sourceNode, targetNode) {
  const self = this;
  const dom = renderDom('canvas', {className: 'edge'})
  dom.style.position = 'absolute';
  const adjust = {w: 10, h: 1, Xcritical: 0, Ycritical: 50}  // 微调
  const position = ['left-top', 'right-top', 'left-bottom', 'right-bottom']
  const computeSourcePosition = (source, target) => {
    if (source.y + source.h < target.y) {
      if (source.x + source.w / 2 < target.x) {
        return position[0]
      } else {
        return position[1]
      }
    } else {
      if (source.x + source.w / 2 < target.x) {
        return position[2]
      } else {
        return position[3]
      }
    }
  }
  const computeX = (source, target) => {
    return Math.min(source.x + source.w / 2, target.x + target.w / 2) - adjust.w;
  }
  const computeY = (source, target) => {
    const sourcePosition = computeSourcePosition(source, target);
    if (sourcePosition === position[0] || sourcePosition === position[1]) {
      return Math.min(source.y + source.h, target.y + target.h) + adjust.h;
    } else {
      return target.y + adjust.h - adjust.Ycritical;
    }
  }
  const computeW = (source, target) => {
    return Math.abs(source.x - target.x) + 2 * adjust.w;
  }
  const computeH = (source, target) => {
    const sourcePosition = computeSourcePosition(source, target);
    if (sourcePosition === position[0] || sourcePosition === position[1]) {
      return Math.abs(source.y - target.y) - (((source.y - target.y) > 0) ? source.h : target.h) - adjust.h;
    } else {
      return source.y + source.h + adjust.Ycritical - (target.y - adjust.Ycritical)
    }
  }
  
  this.geometry = new Proxy({}, {
    get(obj, prop) {
      switch (prop) {
        case 'sourcePosition': return computeSourcePosition(sourceNode.geometry, targetNode.geometry);
        case 'x': return computeX(sourceNode.geometry, targetNode.geometry);
        case 'y': return computeY(sourceNode.geometry, targetNode.geometry);
        case 'w': return computeW(sourceNode.geometry, targetNode.geometry);
        case 'h': return computeH(sourceNode.geometry, targetNode.geometry);
        default: throw new Error('has not this prop');
      }
    }
  })
  
  this.ctx = dom.getContext('2d');
  const draw = () => {
    self.ctx.beginPath();
    self.ctx.lineWidth = 2;
    self.ctx.moveTo(adjust.w, 0);
    self.ctx.bezierCurveTo(0, self.geometry.h / 2, self.geometry.w, self.geometry.h / 2, self.geometry.w - adjust.w, self.geometry.h);
    self.ctx.stroke();
  }
  const resetGeometry = () => {
    dom.style.top = self.geometry.y + 'px';
    dom.style.left = self.geometry.x + 'px';
    dom.style.width = self.geometry.w + 'px';
    dom.style.height = self.geometry.h + 'px';
    dom.width = self.geometry.w;
    dom.height = self.geometry.h;
    draw();
    window.requestAnimationFrame(resetGeometry);
  }
  resetGeometry();
  document.body.appendChild(dom);
}