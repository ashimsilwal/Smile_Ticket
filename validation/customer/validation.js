const { Validator } = require("node-input-validator");
// const connection = require("../../connection")
const db=require('../../constant/db')

//Field validation of add job
module.exports.add_job = (request) => {
  const validateAddJob = new Validator(request.body, {
    title: "required",
    description : "required",
    country: "required",
    budget: "required",
    skillid: "required",

  });
  return validateAddJob;
};
//Field validation of add category
module.exports.addCategory = (request) => {
  const validateCategory = new Validator(request.body, {
    category_name: "required",
  });
  return validateCategory;
};
//Field validation of add subcategory
module.exports.addsubCategory = (request) => {
  const validateSubCategory = new Validator(request.body, {
    subcategory_name: "required",
  });
  return validateSubCategory;
};
//Field validation of freelancer profile
module.exports.freelancerProfile = (request) => {
  const validateProfile = new Validator(request.body, {
    username: "required",
    description: "required",
    country: "required",
    occupation: "required"
  });
  return validateProfile;
};
//Field validation for contact
module.exports.contact = (request) => {
  const contact = new Validator(request.body, {
    name: "required",
    email: "required|email",
    phone_number: "required|numeric",
    services: "required",
    message: "required",
  });
  return contact;
};

module.exports.blogs = async(request) => {
  const connection = await db.conn();
  const blogs = new Validator(request.body, {
    title: "required",
    description: "required",
    // image: "required",
  });
  blogs.addPostRule(async (provider) => {
    const checkTitle = await title(provider.inputs.title,connection);
    if (checkTitle) {
      provider.error("title", "custom", "Title already exist");
    }

  });
  function title(title,connection) {
    return new Promise((resolve, reject) => {
      query = `SELECT title FROM blogs WHERE title = '${title}' `;
      connection.query(query, (error, results) => {
        connection.release();
        if (error) {
          reject(error);
        }
        if (results.length > 0) {
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  }
  return blogs;
};
//validation for skillsname
module.exports.vskills = (request,connection) => {
  const skill = new Validator(request.body, {
    skillname: "required",
  });
  skill.addPostRule(async (provider) => {
    const checkSkillname = await skillname(provider.inputs.skillname);
    if (checkSkillname) {
      provider.error("skillname", "custom", "Skillname already exist");
    }

  });
  function skillname(skillname) {
    return new Promise((resolve, reject) => {
      const query = `SELECT skillname FROM allSkills WHERE LOWER(skillname) = LOWER('${skillname}')`;
      connection.query(query, (error, results) => {
        connection.release()
        if (error) {
          reject(error);
        }
        if (results.length > 0) {
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  }
  return skill;
};
//validation for services
module.exports.services = async(request) => {
  const connection = await db.conn();
  const service = new Validator(request.body, {
    title: "required",
  });
  service.addPostRule(async (provider) => {
    const checkTitle = await serviceTitle(provider.inputs.title);
    if (checkTitle) {
      provider.error("Service title", "custom", "Title already exist");
    }

  });
  function serviceTitle(title) {
    return new Promise((resolve, reject) => {
      const query = `SELECT title FROM services WHERE LOWER(title) = LOWER('${title}')`;
      connection.query(query, (error, results) => {
        connection.release();
        if (error) {
          reject(error);
        }
        if (results.length > 0) {
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  }
  return service;
};

//manage error

//Field validation of add job
module.exports.add_gigs = (request) => {
  const validateAddGigs = new Validator(request.body, {

    // title: "required",
    // startingat: "required",
    // totalworkcomplete: "required",
    // gigsdescription: "required",
    // categoryid: "required",
    // skillid: "required",

  });
  return validateAddGigs;
};