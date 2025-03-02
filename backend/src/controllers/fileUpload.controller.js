import asyncMiddleware from "../middlewares/async.middleware.js";

const uploadProfilePicture = asyncMiddleware(async(req, res) =>{
    if (!req.file) {
         res.status(400).json({ error: "No files uploaded" });
         return
    } 
    res.status(200).json({fileUrl: req.file.path})
    // Saving to the DB will be implemented
})
const uploadIssueAttachements = asyncMiddleware(async(req, res)=>{
    if (!req.files || req.files.length === 0) {
         res.status(400).json({ error: "No files uploaded" });
         return
      }
      const filePaths = req.files.map(file => file.path);
      res.status(200).json({filePaths})

})

export {
    uploadProfilePicture,
    uploadIssueAttachements
}