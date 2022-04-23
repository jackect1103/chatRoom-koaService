/**
 * koa-body 是一个可以帮助解析 http 中 body 的部分的中间件，包括 json、表单、文本、文件等。
 * koa-static 就是koa（node框架）中最常用的、较为成熟的 静态web托管服务中间件 ，在koa中常用于比如外链静态资源（如CSS文件）
 */
import  KoaBody  from 'koa-body'
import KoaStatic from 'koa-static'
import path from 'path';

const __dirname = path.resolve();

const koaBody =  KoaBody({
  multipart:true, // 支持文件上传
  // encoding:'gzip',
  formidable:{
    uploadDir:path.join(__dirname,'public/upload/'), // 设置文件上传目录
    keepExtensions: true,    // 保持文件的后缀
    maxFieldsSize:2 * 1024 * 1024, // 文件上传大小
    onFileBegin:(name,file) => { // 文件上传前的设置
      // console.log(`name: ${name}`);
      // console.log(file);
    },
  }
})

const koaStatic = KoaStatic(
  path.join( __dirname,  "/public")
)

export {
  koaBody,
  koaStatic
}