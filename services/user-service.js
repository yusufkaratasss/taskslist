const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const  jwt = require("jsonwebtoken");
const  cors = require("cors");
const { connect } = require("mongo");
const { MongoClient } = require("mongodb");
const userRepository = require("../repository/user-repository");
const _ = require("lodash");

// ekleme
exports.kayıtolUser = async (request, response) => {
    
    try {
    
        const { username, password, birthdate, tc, description } = request.body;

        const result = await userRepository.kayıtolUser(username, password, birthdate, tc, description);

        if (username.length < 3) {
            return response.status(400).json({
                message: "Kullanıcı adı en az 3 karakter olmalıdır"
            });
        }

        if (tc.length !== 11) {
            return response.status(400).json({
                message: "TC kimlik numarası 11 haneli olmalıdır"
            });
        }
                
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

        if (!passwordRegex.test(password)) {
            return response.status(400).json({
                message: "Şifre en az bir büyük harf, bir sayı ve en az 8 karakter içermelidir"
            });
        }

        if (result && result.message === "Bu kullanıcı adı zaten kullanılıyor") {
        
            return response.status(400).json({
        
                message: "Bu kullanıcı adı zaten kullanılıyor"
        
            });
        
        } else {
        
            return response.status(200).json({
        
                message: "Başarılı bir şekilde kaydedildi"
        
            });
        
        }
        
        
        
    } catch (error) {
     
        console.error("Hata oluştu:", error);
     
        return response.status(404).json({
     
            message: "Bir hata oluştu"
     
        });
    }
};

exports.kullanıcıEkle = async (request, response) => {
    
    try {
    
        const { username,  birthdate, tc } = request.body;

        const result = await userRepository.kullanıcıUser( username, birthdate, tc );        
        
        
    } catch (error) {
     
        console.error("Hata oluştu:", error);
     
        return response.status(404).json({
     
            message: "Bir hata oluştu"
     
        });
    }
};

exports.gorevlerListesiEkle = async (request, response) => {
    
    try {
    
        const { taskTypeId,usersId,  text } = request.body;
            
        const result = await userRepository.gorevlerListesiRegister( taskTypeId, usersId, text );

        if (result) {
     
            return response.status(200).json({
     
                message: result.message

            });
       
       
        } else {
     
            return response.status(400).json({
     
                message: result.message
     
            });
        }
    
    } catch (error) {
     
        console.error("Hata oluştu:", error);
     
        return response.status(404).json({
     
            message: "Bir hata oluştu"
     
        });
    }
};

exports.gorevlerlistesiYenikullanıcı = async (request, response) => {
    
    try {
    
        const { taskTypeId, usersId,username,birthdate, tc,text } = request.body;
        console.log(request.body);
        const result = await userRepository.yenikullanıcı( taskTypeId,usersId,username,birthdate,text, tc);

        if (result) {
     
            return response.status(200).json({
     
                message: result.message

            });
       
       
        } else {
     
            return response.status(400).json({
     
                message: result.message
     
            });
        }
    
    } catch (error) {
     
        console.error("Hata oluştu:", error);
     
        return response.status(404).json({
     
            message: "Bir hata oluştu"
     
        });
    }
};

exports.addUser = async (request, response) => {
    try {
        const { description, _id} = request.body;
     
        const result = await userRepository.addUser(description, _id);

        if (result && result.success) {
            return response.status(200).json({
                message: result.message,
                user: result.user,
            });
        } else {
            return response.status(400).json({
                message: result.message,
            });
        }
    } catch (error) {
        console.error("Hata oluştu:", error);
        return response.status(404).json({
            message: "Bir hata oluştu",
        });
    }
};

exports.girisyapUser = async (request, response) => {
    
    try {

        const {  username, password, birthday, tc  } = request.body;

        const result = await userRepository.girisUser( username, password, birthday, tc );

        if (result.success) {
          
            const token = jwt.sign({ username }, "gizliAnahtar", { expiresIn: "30m" });
          
            return response.json({
     
                message: "Giriş başarılı!",
          
                token: token,
          
            });
        
    
        } else {
     
            return response.status(404).json({
     
                message: "Kullanıcı adı veya şifre hatalı!"
     
            });
        }
    
    } catch (error) {
     
        console.error("Bir hata oluştu:", error);
     
        return response.status(404).json({
     
            message: "Sunucu hatası"
     
        });
    }
};
// Güncelleme
exports.gorevlerlistesiguncelleme = async (request, response) => {
    
    try {

        const { taskTypeId,  _id, _id2, username, text, birthdate, tc } = request.body;

        const result = await userRepository.görevlerlistesiUpdate( taskTypeId, _id, _id2,username, text, birthdate, tc);
            
        if (result) {
     
            return response.status(200).json({
     
                message: result.message

            });
     
        } else {
     
            return response.status(400).json({
     
                message: result.message
     
            });
        }
    
    } catch (error) {
     
        console.error("Hata oluştu:", error);
     
        return response.status(404).json({
     
            message: "Bir hata oluştu"
     
        });
    }
};

exports.gorevtipiguncelleme = async (request, response) => {
    
    try {
        const { description, _id } = request.body;
           
        const result = await userRepository.gorevtipiUpdate(description, _id);
            
        if (result) {
     
            return response.status(200).json({
     
                message: result.message

            });
     
        } else {
     
            return response.status(400).json({
     
                message: result.message
     
            });
        }
    
    } catch (error) {
     
        console.error("Hata oluştu:", error);
     
        return response.status(404).json({
     
            message: "Bir hata oluştu"
     
        });
    }
};

exports.kullanıcıguncelleme = async (request, response) => {
    
    try {
        const { username, birthdate, tc,_id,  } = request.body;
       
        const result = await userRepository.kullanıcıUpdate( username, birthdate, tc, _id);
            
        if (result) {
     
            return response.status(200).json({
     
                message: result.message

            });
     
        } else {
     
            return response.status(400).json({
     
                message: result.message
     
            });
        }
    
    } catch (error) {
     
        console.error("Hata oluştu:", error);
     
        return response.status(404).json({
     
            message: "Bir hata oluştu"
     
        });
    }
};

exports.kullanıcıguncelleme2 = async (request, response) => {
    
    try {
        const { username, birthdate,taskTypeId,text, tc, _id, _id2,  } = request.body;
   
        const result = await userRepository.kullanıcıUpdate2( username, birthdate, taskTypeId, text, tc,_id, _id2);
            
        if (result) {
     
            return response.status(200).json({
     
                message: result.message

            });
     
        } else {
     
            return response.status(400).json({
     
                message: result.message
     
            });
        }
    
    } catch (error) {
     
        console.error("Hata oluştu:", error);
     
        return response.status(404).json({
     
            message: "Bir hata oluştu"
     
        });
    }
};

// Listeleme
exports.kullanıcıListing = async (request, response) => {
    try {
        const users = await userRepository.kullanıcıliste(); 
        return response.status(200).json(users);
    } catch (error) {
        console.error("Bir hata oluştu:", error);
        return response.status(500).json({
            message: "Sunucu hatası"
        });
    }
};

exports.görevlerListing = async (request, response) => {
    try {
        const users = await userRepository.görevliste(); 
        return response.status(200).json(users);
    } catch (error) {
        console.error("Bir hata oluştu:", error);
        return response.status(500).json({
            message: "Sunucu hatası"
        });
    }
};

exports.görevtipiListing = async (request, response) => {
    try {
        const users = await userRepository.görevtipiliste(); 
        return response.status(200).json(users);
    } catch (error) {
        console.error("Bir hata oluştu:", error);
        return response.status(500).json({
            message: "Sunucu hatası"
        });
    }
};

exports.currentuserUser = async (request, response) => {
    try {
        const users = await userRepository.currentuserUsers();
        return response.status(200).json(users);
    } catch (error) {
        console.error("Bir hata oluştu:", error);
        return response.status(500).json({
            message: "Sunucu hatası"
        });
    }
};

exports.currentuser2User = async (request, response) => {
    try {
        const users = await userRepository.currentuser2Users();
        return response.status(200).json(users);
    } catch (error) {
        console.error("Bir hata oluştu:", error);
        return response.status(500).json({
            message: "Sunucu hatası"
        });
    }
};

exports.usersListing = async (request, response) => {
    try {
        const users = await userRepository.users();
        return response.status(200).json(users);
    } catch (error) {
        console.error("Bir hata oluştu:", error);
        return response.status(500).json({
            message: "Sunucu hatası"
        });
    }
};
// Silme işlemi
exports.kullanıcıDelete = async (request, response) => {
    try {
        const {_id} = request.body;
       
        const result = await userRepository.kullanıcıSil(_id);

        if (result && result.success) {
            return response.status(200).json({
                message: result.message,
                user: result.user,
            });
        } else {
            return response.status(400).json({
                message: result.message,
            });
        }
    } catch (error) {
        console.error("Bir hata oluştu:", error);
        return response.status(500).json({
            message: "Sunucu hatası"
        });
    }
};

exports.görevtipiDelete = async (request, response) => {
    try {
        const {_id} = request.body;
       
        const result = await userRepository.görevtipiSil(_id);

        if (result && result.success) {
            return response.status(200).json({
                message: result.message,
                user: result.user,
            });
        } else {
            return response.status(400).json({
                message: result.message,
            });
        }
    } catch (error) {
        console.error("Bir hata oluştu:", error);
        return response.status(500).json({
            message: "Sunucu hatası"
        });
    }
};

exports.görevlerDelete = async (request, response) => {
    try {
        const {_id} = request.body;

        const result = await userRepository.görevleriSil(_id);

        if (result && result.success) {
            return response.status(200).json({
                message: result.message,
                user: result.user,
            });
        } else {
            return response.status(400).json({
                message: result.message,
            });
        }
    } catch (error) {
        console.error("Bir hata oluştu:", error);
        return response.status(500).json({
            message: "Sunucu hatası"
        });
    }
};