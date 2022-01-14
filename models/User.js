//Toda classe começa com letra maiúscula
class User{  
    constructor(name, email, gender, birth, country, password, photo, admin){
        //this.atributo = variável do parâmetro
        //Inicializando os valores para serem usados em métodos dentro da classe
        this.name = name;
        this.gender = gender;
        this.birth = birth;
        this.country = country;
        this.email = email;
        this.password = password;
        this.photo = photo;
        this.admin = admin;
    }
    
}