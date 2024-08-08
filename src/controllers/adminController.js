import { adminService } from "@/services";

async function createUser(req,res){
  const user =await adminService.createUser(req.body)
  if (user) {
    res.status(201).json(user);
  }else {
    res.status(400).json({ message: "User not created" });
  }
}

async function getAllUsers(req,res){
  try{
    const {sortby,limit,page,search,role,order} = req.query;
    const criteria = {
      sort : sortby || 'createdAt',
      order : order?.toUpperCase() === 'DESC' ? 'DESC' : 'ASC',
      limit : parseInt(limit,10) || 10,
      page : parseInt(page,10) || 1,
      search : search || '',
      role : role || ''
    }

    const users = await adminService.getAllUsers(criteria);
    res.status(200).json(users);
  }catch(err){
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function getUserById(req,res){
  const user = await adminService.getUserById(req.params.id);
  if (user) {
    res.status(200).json(user);
  }else {
    res.status(404).json({ message: "User not found" });
  }
}

// eslint-disable-next-line
async function updateUser(userId,userInput){
}

// eslint-disable-next-line
async function deleteUser(userId){
}





export { createUser , getAllUsers, updateUser, deleteUser , getUserById };