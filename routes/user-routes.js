const express = require("express");
const router = express.Router();
const userService = require("../services/user-service");

// Ekleme kısmı
router.post("/register", userService.kayıtolUser);

router.post("/register4", userService.kullanıcıEkle);

router.post("/register2", userService.gorevlerlistesiYenikullanıcı);

router.post("/register3", userService.gorevlerListesiEkle);

router.post("/add", userService.addUser);

router.post("/login", userService.girisyapUser);
//

// Güncelleme
router.put("/update", userService.gorevlerlistesiguncelleme);

router.put("/update2", userService.gorevtipiguncelleme);

router.put("/update3", userService.kullanıcıguncelleme);

router.put("/update4", userService.kullanıcıguncelleme2);
//

// Listeleme
router.get("/listing", userService.kullanıcıListing);

router.get("/listing2", userService.görevlerListing);

router.get("/listing3", userService.görevtipiListing);
//

// Listeleme 2
router.get("/currentuser", userService.currentuserUser);

router.get("/currentuser2", userService.currentuser2User);

router.get("/users", userService.usersListing);
//

// Silme işlemi
router.delete("/delete", userService.kullanıcıDelete);

router.delete("/delete2", userService.görevtipiDelete);

router.delete("/delete3", userService.görevlerDelete);

module.exports = router;
