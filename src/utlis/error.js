exports.CreateError=()=>{
    const err = new Error();
    err.status = this.status;
    err.message = this.message;
    return err;
}