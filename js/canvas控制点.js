

  /**
   * 抽象-封装
   * 构造参数需要canvas的上下文对象、重绘回调函数，初始化的坐标
   */
  function ControlPoint(canvas=canvas, drawFn=drawFn, initPosition = {
    x: 300,
    y: 300
  }) {
    // 1、首先初始化控制点的坐标
    const position = {
      ...initPosition
    };
    // 2、画出控制点（这里应当使用重绘回调）
    const ctx = canvas.getContext('2d');
    ctx.fillRect(position.x, position.y, 10, 10);
    // drawFn();
    // 3、给画布添加监听
    canvas.addEventListener('mousedown', moveStart);

    function moveStart(evt) {
      // 4、读取鼠标坐标
      const {
        offsetX,
        offsetY
      } = evt;
      // 6、计算出鼠标距离控制点左上角的偏移，留在后面使用
      const [offset_x, offset_y] = [offsetX - position.x, offsetY - position.y]

      // 5、如果鼠标位置正在控制点上，则触发拖拽移动
      if (offsetX > position.x && offsetX <= position.x + 10 && offsetY > position.y && offsetY <= position.y + 10) {
        canvas.addEventListener('mousemove', moving); // 绑定鼠标移动事件
        canvas.addEventListener('mouseup', moveEnd); // 绑定鼠标释放事件
      }

      function moving(evt) {
        // 6、鼠标拖拽中，先获取鼠标坐标，计算新坐标的位置
        const {
          offsetX: x,
          offsetY: y
        } = evt;
        position.x = x - offset_x, // 当前鼠标的x坐标 - 鼠标按下时鼠标距离控制点左上角坐标的x坐标的偏差 = 新的控制点的x坐标
          position.y = y - offset_y, // 当前鼠标的y坐标 - 鼠标按下时鼠标距离控制点左上角坐标的y坐标的偏差 = 新的控制点的y坐标
          // 7、调用重绘方法，重绘控制点的位置
          drawFn()
      }

      function moveEnd(evt) {
        // 8、删除鼠标监听事件
        canvas.removeEventListener('mousemove', moving);
        canvas.removeEventListener('mouseup', moveEnd);
      }
    }
    return position;
  }
