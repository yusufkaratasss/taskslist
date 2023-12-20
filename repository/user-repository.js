const cors = require("cors");
const {
    connect
} = require("mongo");
const {
    MongoClient,
    ObjectId
} = require("mongodb");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
    response
} = require("express");


exports.kullanıcıliste = async () => {
    const url = 'mongodb://localhost:27017';
    const databs = 'mydatabase2';

    try {

        const client = new MongoClient(url);

        await client.connect();

        const db = client.db(databs);

        const users = db.collection('users');

        const result = await users.find().toArray();

        await client.close();

        return result;

    } catch (error) {

        console.error("Bir hata oluştu:", error);

        throw error;
    }
};


exports.görevliste = async () => {
    const url = 'mongodb://localhost:27017';
    const databs = 'mydatabase2';

    try {

        const client = new MongoClient(url);

        await client.connect();

        const db = client.db(databs);

        const tasks = db.collection('tasks');
        const taskstype = db.collection('taskstype');

        const result = await tasks.find().toArray();
        const result2 = await taskstype.find().toArray();
        await client.close();

        return result;

    } catch (error) {

        console.error("Bir hata oluştu:", error);

        throw error;
    }
};

exports.görevtipiliste = async () => {
    const url = 'mongodb://localhost:27017';
    const databs = 'mydatabase2';

    try {
        const client = new MongoClient(url);

        await client.connect();

        const db = client.db(databs);

        const tasktype = db.collection('tasktype');

        const result = await tasktype.find().toArray();

        await client.close();

        return result;

    } catch (error) {

        console.error("Bir hata oluştu:", error);

        throw error;
    }
};


// register

exports.kayıtolUser = async (username, password, birthdate, tc) => {

    const url = 'mongodb://localhost:27017';

    const databs = 'mydatabase2';

    try {

        const client = new MongoClient(url);

        await client.connect();

        console.log('MongoDB ye başarıyla bağlandı');

        const db = client.db(databs);

        const users = db.collection('users');

        const currentuser = await users.findOne({

            username

        });

        if (currentuser) {

            await client.close();

            return {

                message: "Bu kullanıcı adı zaten kullanılıyor"

            };

        }

        const hash = await bcrypt.hash(password, 10);

        const data = {
            username: username,
            password: hash,
            birthdate: birthdate,
            tc: tc
        };

        const result = await users.insertOne(data);

        if (result.insertedCount === 1) {
            await client.close();
            return {
                message: "Veri başarıyla kaydedildi"
            };
        } else {
            await client.close();
            return {
                message: "Veri kaydedilirken bir hata oluştu"
            };
        }
    } catch (error) {
        console.error("Hata oluştu:", error);
        return {
            message: "Bir hata oluştu"
        };
    }
};



exports.kullanıcıUser = async (username, birthdate, tc) => {

    const url = 'mongodb://localhost:27017';

    const databs = 'mydatabase2';

    try {

        const client = new MongoClient(url);

        await client.connect();

        console.log('MongoDB ye başarıyla bağlandı');

        const db = client.db(databs);

        const users = db.collection('users');

        const data = {
            username: username,
            birthdate: birthdate,
            tc: tc
        };

        const result = await users.insertOne(data);

        if (result.insertedCount === 1) {
            await client.close();
            return {
                message: "Veri başarıyla kaydedildi"
            };
        } else {
            await client.close();
            return {
                message: "Veri kaydedilirken bir hata oluştu"
            };
        }
    } catch (error) {
        console.error("Hata oluştu:", error);
        return {
            message: "Bir hata oluştu"
        };
    }
};

exports.yenikullanıcı = async (taskTypeId, usersId, username, birthdate, text, tc) => {

    const url = 'mongodb://localhost:27017';
    const database = 'mydatabase2';

    try {
        const client = new MongoClient(url);
        await client.connect();
        console.log(username);
        const db = client.db(database);

        const tasktype = db.collection('tasktype');
        const tasks = db.collection('tasks');
        const users = db.collection('users');

        const taskTypesData = await tasktype.find().toArray();
        console.log(username)
        const data2 = {
            username: username,
            birthdate: birthdate,
            tc: tc
        }

        const result2 = await users.insertOne(data2);

        const selectedRecord2 = taskTypesData.find((element) => element._id == taskTypeId);

        const usersId = {
            _id: result2.insertedId,
            username,
            birthdate,
            tc
        };

    
        const data = {
            text: text,
            taskTypeId: selectedRecord2,
            usersId: usersId,
        };

        const result = await tasks.insertOne(data);

        await client.close();

        if (result) {
            return {
                message: "Veri başarıyla kaydedildi"
            };
        }
    } catch (error) {
        console.error("Hata oluştu:", error);
        return {
            message: "Bir hata oluştu"
        };
    }
};



exports.gorevlerListesiRegister = async (taskTypeId, usersId, text) => {

    const url = 'mongodb://localhost:27017';
    
    const database = 'mydatabase2';

    try {
        const client = new MongoClient(url);
        await client.connect();
        console.log('MongoDB ye başarıyla bağlandı');
        const db = client.db(database);

        const tasktype = db.collection('tasktype');

        const tasks = db.collection('tasks');

        const users = db.collection('users');

        const taskTypesData = await tasktype.find().toArray();

        const tasksData = await users.find().toArray();
              
            const selectedRecord2 = taskTypesData.find((element) => element._id == taskTypeId);
            
            const selectedRecord3 = tasksData.find((element) => element._id == usersId);

            const data = {
                text: text,
                taskTypeId: selectedRecord2,
                usersId: selectedRecord3
            };

            const result = await tasks.insertOne(data);
        
        

        await client.close();
        
        if (result) {
            return {
                message: "Veri başarıyla kaydedildi"
            };
        }
    } catch (error) {
        console.error("Hata oluştu:", error);
        return {
            message: "Bir hata oluştu"
        };
    }
};

exports.gorevtipiUpdate = async (description, _id) => {

    const url = 'mongodb://localhost:27017';

    const database = 'mydatabase2';

    try {
        const client = new MongoClient(url);

        await client.connect();

        console.log('MongoDB ye başarıyla bağlandı');

        const db = client.db(database);

        const tasktype = db.collection('tasktype');

        const tasks = db.collection('tasks');

        const result = await tasktype.updateOne(

            {
                _id: new ObjectId(_id)
            }, {
                $set: {
                    description: description,
                }
            }
        );

        const taskTypeId = await tasks.updateMany(

            {
                'taskTypeId._id': new ObjectId(_id)
            }, {
                $set: {
                    'taskTypeId.description': description
                }
            }

        );

        if (taskTypeId.modifiedCount > 0) {

            console.log('Belgeler başarıyla güncellendi.');

        } else {

            console.log('Belgeler güncellenemedi.');

        }
        await client.close('taskTypeId.description', description);

        if (result) {
            return {
                message: 'Veri başarıyla kaydedildi'
            };
        }
    } catch (error) {
        console.error('Hata oluştu:', error);
        return {
            message: 'Bir hata oluştu'
        };
    }
};


exports.görevlerlistesiUpdate = async (taskTypeId, _id, _id2,username, text, birthdate, tc) => {

    const url = 'mongodb://localhost:27017';

    const database = 'mydatabase2';

    try {

        const client = new MongoClient(url);

        await client.connect();

        console.log('MongoDB ye başarıyla bağlandı');

        const db = client.db(database);

        const users = db.collection('users');

        const tasktype = db.collection('tasktype');

        const tasks = db.collection('tasks');

        const taskTypesData = await tasktype.find().toArray();

        //onemlı
        var selectedRecord2 = taskTypesData.find((element) => element._id == taskTypeId);

        var result = await tasks.updateOne({
            _id: new ObjectId(_id)
        }, {
            $set: {
                text: text,
                taskTypeId: selectedRecord2,
            }
        })


        const usersUpdate2 = await tasks.updateMany(

            {
                'usersId._id': new ObjectId(_id2)
            }, {
                $set: {
                    'usersId.username': username,
                    'usersId.birthdate': birthdate,
                    'usersId.tc': tc
                }
            }
        );


        const usersUpdate = await users.updateOne(

            {
                '_id': new ObjectId(_id2)
            }, {
                $set: {
                    'username': username,
                    'birthdate': birthdate,
                    'tc': tc
                }
            }
        );

            if (usersUpdate.modifiedCount > 0) {

                console.log('Belgeler başarıyla güncellendi.');

            } else {

                console.log('Belgeler güncellenemedi.');

            }

        await client.close();

        if (result) {

            return {
                message: "Veri başarıyla kaydedildi"
            };
        }
    } catch (error) {

        console.error("Hata oluştu:", error);
        return {
            message: "Bir hata oluştu"
        };
    };
};


exports.kullanıcıUpdate = async (username, birthdate, tc, _id) => {

    const url = 'mongodb://localhost:27017';

    const database = 'mydatabase2';

    try {
        const client = new MongoClient(url);

        await client.connect();

        console.log('MongoDB ye başarıyla bağlandı');

        const db = client.db(database);

        const tasks = db.collection('tasks');

        const users = db.collection('users');

        const result = await users.updateOne(

            {
                _id: new ObjectId(_id)
            }, {
                $set: {
                    username: username,
                    birthdate,
                    tc
                }
            }
        );


        const usersId = await tasks.updateOne(

            {
                'usersId._id': new ObjectId(_id)
            }, {
                $set: {
                    'usersId.username': username,
                    'usersId.birthdate': birthdate,
                    'usersId.tc': tc
                }
            }
        );

        if (usersId.modifiedCount > 0) {

            console.log('Belgeler başarıyla güncellendi.');

        } else {

            console.log('Belgeler güncellenemedi.');

        }

        await client.close();

        if (result) {

            return {

                message: 'Veri başarıyla kaydedildi'
            };
        }
    } catch (error) {

        console.error('Hata oluştu:', error);
        return {

            message: 'Bir hata oluştu'
        };
    }
};


exports.kullanıcıUpdate2 = async (username, birthdate, taskTypeId,text,tc,_id, _id2) => {

    const url = 'mongodb://localhost:27017';

    const database = 'mydatabase2';

    try {
        const client = new MongoClient(url);

        await client.connect();

        console.log('MongoDB ye başarıyla bağlandı');

        const db = client.db(database);

        const tasks = db.collection('tasks');
       
        const tasktype = db.collection('tasktype');

        const users = db.collection('users');

        const usersUpdate = await users.updateOne(

            {
                '_id': new ObjectId(_id2)
            }, {
                $set: {
                    'username': username,
                    'birthdate': birthdate,
                    'tc': tc,

                }
            }
        );

        const usersId = await tasks.updateOne(

            {
                'usersId._id': new ObjectId(_id2)
            }, {
                $set: {
                    'usersId.username': username,
                    'usersId.birthdate': birthdate,
                    'usersId.tc': tc,
                }
            }
        );

        const taskTypesData = await tasktype.find().toArray();

        //onemlı
        
        var selectedRecord2 = taskTypesData.find((element) => element._id == taskTypeId);
        
        console.log(selectedRecord2)
        
        var result = await tasks.updateOne({
        
            _id: new ObjectId(_id)
        
        },{
            $set: {
                text: text,
                taskTypeId: selectedRecord2,
            }
        })

        if (usersUpdate.modifiedCount > 0) {

            console.log('Belgeler başarıyla güncellendi.');

        } else {

            console.log('Belgeler güncellenemedi.');

        }

        if (usersId.modifiedCount > 0) {

            console.log('Belgeler başarıyla güncellendi.');

        } else {

            console.log('Belgeler güncellenemedi.');

        }

        await client.close();

        if (usersUpdate) {

            return {

                message: 'Veri başarıyla kaydedildi'
            };
        }
    } catch (error) {

        console.error('Hata oluştu:', error);
        return {

            message: 'Bir hata oluştu'
        };
    }
};
exports.addUser = async (description) => {

    const url = 'mongodb://localhost:27017';

    const databs = 'mydatabase2';

    try {

        const client = new MongoClient(url);

        await client.connect();

        console.log('MongoDB ye başarıyla bağlandı');

        const db = client.db(databs);


        const tasktype = db.collection('tasktype');


        const data = {
            description: description,
        };

        const result = await tasktype.insertOne(data);

        await client.close();


        if (result) {

            return {

                message: "Veri başarıyla kaydedildi"

            };
        }

    } catch (error) {

        console.error("Hata oluştu:", error);

        return {

            message: "Bir hata oluştu"

        };
    }
};

// login

exports.girisUser = async (username, password, birthday, tc) => {

    const url = 'mongodb://localhost:27017';

    const databs = 'mydatabase2';

    try {

        const client = new MongoClient(url);

        await client.connect();

        const db = client.db(databs);

        const users = db.collection("users");

        const user = await users.findOne({

            username

        });

        if (!user) {

            await client.close();

            return {
                success: false
            };

        }

        const compare = await bcrypt.compare(password, user.password);

        if (!compare) {

            await client.close();

            return {
                success: false
            };

        }

        await client.close();

        return {
            success: true
        };

    } catch (error) {

        console.error("Bir hata oluştu:", error);

        return {
            success: false
        };

    }
};

// current user

exports.currentuserUsers = async () => {

    const url = 'mongodb://localhost:27017';

    const databs = 'mydatabase2';

    try {
        const client = new MongoClient(url);

        await client.connect();

        const db = client.db(databs);


        const tasks = db.collection('tasks');


        const users2 = await tasks.find().toArray();


        await client.close();

        return users2;

    } catch (error) {

        console.error("Bir hata oluştu:", error);

        throw error;

    }
};

exports.currentuser2Users = async () => {

    const url = 'mongodb://localhost:27017';

    const databs = 'mydatabase2';

    try {
        const client = new MongoClient(url);

        await client.connect();

        const db = client.db(databs);

        const tasktype = db.collection('tasktype');

        const users3 = await tasktype.find().toArray();

        await client.close();

        return users3;

    } catch (error) {

        console.error("Bir hata oluştu:", error);

        throw error;
    }
};

exports.users = async () => {

    const url = 'mongodb://localhost:27017';

    const databs = 'mydatabase2';

    try {
        const client = new MongoClient(url);

        await client.connect();

        const db = client.db(databs);

        const users = db.collection('users');

        const users3 = await users.find().toArray();

        await client.close();

        return users3;

    } catch (error) {

        console.error("Bir hata oluştu:", error);

        throw error;
    }
};

exports.kullanıcıSil = async (_id) => {
    
    const url = 'mongodb://localhost:27017';
    
    const databs = 'mydatabase2';

    try {

        const client = new MongoClient(url);
        
        await client.connect();

        const db = client.db(databs);
        
        const users = db.collection("users");
        
        const tasks = db.collection("tasks");

        const objectId = new ObjectId(_id);

        const kullaniciGörevi = await tasks.findOne(

            {'usersId._id': new ObjectId(_id)}, 
        );
       
       if (kullaniciGörevi) {
            await client.close();
            return {
                success: false,
                message: `Kullanıcı ID: ${_id} Bu kullanıcının görevleri bulunmakta. Önce görevleri silin.`,            
            };
        }
        
        else{
        
        await users.deleteOne({ _id: objectId });
        
        await client.close();
        
        return {
        
            success: true,
            message: "Kullanıcı başarıyla silindi.",   
        };
        }
        
    } catch (error) {
        console.error("Bir hata oluştu:", error);
        return {
            success: false,
            message: "Bir hata oluştu."
        };
    }
};


exports.görevtipiSil = async (_id) => {
    const url = 'mongodb://localhost:27017';
    const databs = 'mydatabase2';

    try {
        const client = new MongoClient(url);
        await client.connect();

        const db = client.db(databs);

        const tasktype = db.collection("tasktype");

        const tasks = db.collection("tasks");

        const objectId = new ObjectId(_id);


        const gorevtipiGörevi = await tasks.findOne(

            {'taskTypeId._id': new ObjectId(_id)}, 
        );

        if (gorevtipiGörevi) {
            await client.close();
            return {
                success: false,
                message: `Görev tipi ID: ${_id} Bu görev tipinin görevleri bulunmakta. Önce görevleri silin.`,            
            };
        }
        
        else{
        
        await tasktype.deleteOne({ _id: objectId });
        
        await client.close();
        
        return {
        
            success: true,
            message: "Görev tipi başarıyla silindi.",   
        };
        }
    
    } catch (error) {
        console.error("Bir hata oluştu:", error);
        return {
            success: false,
            message: "Bir hata oluştu."
        };
    } 
};

exports.görevleriSil = async (_id,) => {
    const url = 'mongodb://localhost:27017';
    const databs = 'mydatabase2';

    try {
        const client = new MongoClient(url);
        await client.connect();

        const db = client.db(databs);

        const tasks = db.collection("tasks");

     
        const tasksObjectId = new ObjectId(_id);
        

        await tasks.deleteOne({ _id: tasksObjectId });
   

        await client.close();

        return {
            success: true,
            message: "Görev başarıyla silindi.",
        };
    } catch (error) {
        console.error("Bir hata oluştu:", error);
        return {
            success: false,
            message: "Bir hata oluştu."
        };
    }
};