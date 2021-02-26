const AdminBro = require("admin-bro");
const AdminBroMongoose = require("@admin-bro/mongoose");
//const AdminBroExpress = require("@admin-bro/express");
const AdminBroExpress = require("admin-bro-expressjs");

const Artist = require("./models/Artist");
const Album = require("./models/Album");
const Song = require("./models/Song");
const Language = require("./models/Language");

AdminBro.registerAdapter(AdminBroMongoose);
const adminBro = new AdminBro({
  rootPath: "/admin",
  resources: [
    {
      resource: Artist,
      options: {
        properties: {
          artistAbout: { type: "richtext", isVisible: { list: false, filter: false, show: true, edit: true } },
          _id: { isVisible: { list: false, filter: false, show: false, edit: false } },
          tags: { isVisible: { show: true, list: false, filter: false, edit: true } },
        },
      },
    },
    {
      resource: Album,
      options: {
        properties: {
          _id: { isVisible: { list: false, filter: false, show: true, edit: false } },
          tags: { isVisible: { show: true, list: false, filter: false, edit: true } },
        },
      },
    },
    {
      resource: Song,
      options: {
        properties: {
          _id: { isVisible: { list: false, filter: false, show: false, edit: false } },
          lyrics: {
            type: "richtext",
          },
          tags: { isVisible: { show: true, list: false, filter: false, edit: true } },
        },
      },
    },
    {
      resource: Language,
      options: {
        properties: {
          _id: { isVisible: { list: false, filter: false, show: false, edit: false } },
        },
      },
    },
  ],
  branding: {
    logo: "http://assets.stickpng.com/images/5856b3da4f6ae202fedf2794.png",
    companyName: "ODYSSEY",
    softwareBrothers: false, // if Software Brothers logos should be shown in the sidebar footer
  },
});

const ADMIN = {
  email: process.env.ADMIN_EMAIL || "admin@odyssey.com",
  password: process.env.ADMIN_PASSWORD || "admin@1234",
};

const adminRouter = AdminBroExpress.buildAuthenticatedRouter(adminBro, {
  authenticate: async (email, password) => {
    if (ADMIN.password === password && ADMIN.email === email) {
      return ADMIN;
    }
    return null;
  },
  cookieName: process.env.COOKIE_NAME || "adminbro",
  cookiePassword: process.env.COOKIE_PASSWORD || "somePassword",
});

module.exports = adminRouter;
