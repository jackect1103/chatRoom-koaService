const errorHandel = (ctx, next) => {
  return next().catch((err) => {
    if (err.status === 401) {
      ctx.status = 401;
      ctx.body = {
        data: {
          code: -1,
          message: 'Protected resource, use Authorization header to get access\n(token可能无效了)'
        }
      };
    } else {
      throw err;
    }
  })
}
export default errorHandel