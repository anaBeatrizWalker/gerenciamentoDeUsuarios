//Toda classe começa com letra maiúscula
class User{  
    constructor(name, email, gender, birth, country, password, photo, admin){
        //this.atributo = variável do parâmetro
        //Inicializando os valores para serem usados em métodos dentro da classe
        this._name = name
        this._email = email 
        this._gender = gender
        this._birth = birth
        this._country = country
        this._password = password
        this._photo = photo
        this._admin = admin
        this._register = new Date()
        this._id
    }
    
}