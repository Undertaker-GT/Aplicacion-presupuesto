class Dato{
    constructor(descripcion, valor){
        this.Descripcion= descripcion;
        this.Valor=valor;
    }
    get descripcion(){
        return this.Descripcion;
    }
    set descripcion(descripcion){
        this.Descripcion=descripcion;
    }
    get valor(){
        return this.Valor;
    }
    set valor(valor){
        this.Valor=valor;
    }
}