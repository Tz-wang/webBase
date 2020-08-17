
/**
 * 前端图片压缩基本原理：
 * 1、设置upload的响应函数（upload是input type=file 时的change事件）
 * 2、在响应函数中使用FileReader读取文件，使用Image创建一个图片DOM（图片DOM并不显示在视图中）
 * 3、创建canvas对象，设置宽高，宽高越小，最后生成的文件尺寸和体积也越小
 * 4、使用ctx.drawImage绘制图片
 * 5、使用canvas.toDataURL将画布中的图片导出到BASE64格式数据中（注意导出函数的第二个参数是图片的质量）
 * */

function beforeUpload(event) {

  const file = event.target.file[0];

  if (file.type.indexOf("image") === 0) {
    const reader = new FileReader(), img = new Image();

    reader.readAsDataURL(file);
    reader.onload = (e) => img.src = e.target.result;

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      const [width, height] = [img.width, img.height];
      const [targetWidth, targetHeight] = [width, height];

      // 在此处对 targetWidth 和 targetHeight 做处理，目标尺寸越小，图片的体积也越小

      canvas.width = targetWidth
      canvas.height = targetHeight

      ctx.clearRect(0, 0, targetWidth, targetHeight);
      ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

      const newUrl = canvas.toDataURL('image/jpeg', .92); // 第二个参数是图片的质量，只有jpeg类型的图片可以设置图片质量

    }
  }

}