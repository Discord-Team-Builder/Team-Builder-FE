"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { X, Save, Github, Globe, UserIcon, Plus, SkipBackIcon, Loader2 } from "lucide-react"
import globalState from "@/globalstate/page"
import { useSnapshot } from "valtio"
import { updateProfile } from "@/api/APICall"
import { toast } from "sonner"


export function UserProfile({ onClose }) {
  const { user } = useSnapshot(globalState)
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [formData, setFormData] = useState({
    globalName: user.globalName || "",
    bio: user.bio || "",
    skills: user.skills || [],
    github: user.github || "",
    hashnode: user.hashnode || "",
    peerlist: user.peerlist || "",
  })
  const [newSkill, setNewSkill] = useState("")


  console.log("USER DATA", user)

  const handleSave = async () => {
    setIsSaving(true)
  updateProfile(formData)
    .then((res) => {
      const response = res.data
      globalState.user = {
            ...globalState.user,
            _id: response?.updatedUser?._id || null,
            username: response?.updatedUser?.username || '',
            globalName: response?.updatedUser?.globalName || '',
            avatar: response?.updatedUser?.avatar || '',
            email: response?.updatedUser?.email || '',
            discordId: response?.updatedUser?.discordId || '',
            projects: Array.isArray(response?.updatedUser?.projects) ? response.updatedUser.projects : [],
            bio: response?.updatedUser?.bio || "",
            skills: Array.isArray(response?.updatedUser?.skills) ? response.updatedUser.skills : [],
            github: response?.updatedUser?.github ||  "",
            hashnode: response?.updatedUser?.hashnode ||  "",
            peerlist: response?.updatedUser?.peerlist || "",
          };
      toast.success('user data updated successfully!')
    })
    .catch((err) => {
      console.error('Profile update failed:', err)
    })
    .finally(() => {
      setIsSaving(false)
      setIsEditing(false)
    })
  }

  const handleCancel = () =>{
     setIsEditing(false)
  }

  const handleAddSkill = () => {
    if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
      setFormData({
        ...formData,
        skills: [...formData.skills, newSkill.trim()],
      })
      setNewSkill("")
    }
  }

  const handleRemoveSkill = (skillToRemove) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter((skill) => skill !== skillToRemove),
    })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={onClose}></div>

      <Card className="relative w-full max-w-2xl bg-white/90 backdrop-blur-xl border-white/20 shadow-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <UserIcon className="h-5 w-5" />
                User Profile
              </CardTitle>
              <CardDescription>Manage your profile and social links</CardDescription>
            </div>
            <div className="flex gap-2">
              {!isEditing ? (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsEditing(true)}
                  className="border-discord hover:bg-discord-light"
                >
                  Edit Profile
                </Button>
              ) : (<>
              <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCancel}
                  className="border-discord hover:bg-discord-light"
                >
                  Cancel
                </Button>
              <Button
                size="sm"
                onClick={handleSave}
                disabled={isSaving}
                className="bg-gradient-to-r from-discord to-discord-dark hover:from-discord-light hover:to-discord-dark text-white"
              >
                {isSaving ? (
                  <>
                    <Loader2 className="animate-spin mr-1 h-4 w-4" /> Saving...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-1" />
                    Save
                  </>
                )}
              </Button>
              </>
              )}
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Basic Info */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              {isEditing ? (
                <Input
                  id="name"
                  value={formData.globalName}
                  onChange={(e) => setFormData({ ...formData, globalName: e.target.value })}
                  className="bg-white/50 backdrop-blur-sm border-discord focus:border-discord-dark focus:ring-discord-light"
                />
              ) : (
                <p className="text-gray-800 font-medium">{user?.globalName || 'your name'}</p>
              )}
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <Label>Email</Label>
                <p className="text-gray-600">{user?.email || 'your email'}</p>
              </div>
              <div className="flex-1">
                <Label>Username</Label>
                <p className="text-gray-600">{user?.username || 'your user name'}</p>
                
              </div>
              
            </div>
            {isEditing && (<p className="text-gray-400">Discord username and email is managed via your Discord account and cannot be edited here.</p> )}
            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              {isEditing ? (
                <Textarea
                  id="bio"
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  placeholder="Tell others about yourself..."
                  className="bg-white/50 backdrop-blur-sm border-discord focus:border-discord-dark focus:ring-discord-dark"
                />
              ) : (
                <p className="text-gray-600">{user?.bio || "No bio added yet..."}</p>
              )}
            </div>
          </div>

          {/* Skills */}
          <div className="space-y-2">
            <Label>Skills & Technologies</Label>
            {isEditing ? (
              <div className="space-y-2">
                <div className="flex gap-2">
                  <Input
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    placeholder="Add a skill"
                    className="bg-white/50 backdrop-blur-sm border-discord focus:border-discord-dark focus:ring-discord-dark"
                    onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), handleAddSkill())}
                  />
                  <Button type="button" onClick={handleAddSkill} size="icon" variant="outline">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.skills.map((skill) => (
                    <Badge
                      key={skill}
                      variant="secondary"
                      className="bg-discord-light text-discord-dark hover:bg-discord cursor-pointer"
                      onClick={() => handleRemoveSkill(skill)}
                    >
                      {skill} <X className="h-3 w-3 ml-1" />
                    </Badge>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {user?.skills?.map((skill) => (
                  <Badge key={skill} variant="outline" className="border-discord text-discord-dark">
                    {skill}
                  </Badge>
                )) || <p className="text-gray-500">No skills added yet...</p>}
              </div>
            )}
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <Label>Social Links</Label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* GitHub */}
                <div className="space-y-2">
                  <Label htmlFor="github" className="flex items-center gap-2">
                    <Github className="h-4 w-4" />
                    GitHub
                  </Label>
                  {isEditing ? (
                    <Input
                      id="github"
                      value={formData.github}
                      onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                      placeholder="username"
                      className="bg-white/50 backdrop-blur-sm border-discord-light focus:border-discord focus:ring-discord"
                    />
                  ) : (
                    <a
                      href={user?.github || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-gray-600 max-w-[180px] truncate hover:underline"
                      title={user?.github}
                    >
                      {user?.github || "Not set"}
                    </a>
                  )}
                </div>
                {/* Hashnode */}
                <div className="space-y-2">
                  <Label htmlFor="hashnode" className="flex items-center gap-2">
                    <Globe className="h-4 w-4" />
                    Hashnode
                  </Label>
                  {isEditing ? (
                    <Input
                      id="hashnode"
                      value={formData.hashnode}
                      onChange={(e) => setFormData({ ...formData, hashnode: e.target.value })}
                      placeholder="username"
                      className="bg-white/50 backdrop-blur-sm border-discord-light focus:border-discord focus:ring-discord"
                    />
                  ) : (
                    <a
                      href={user?.hashnode || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-gray-600 max-w-[180px] truncate hover:underline"
                      title={user?.hashnode}
                    >
                      {user?.hashnode || "Not set"}
                    </a>
                  )}
                </div>
                {/* peerlist */}
                <div className="space-y-2">
                  <Label htmlFor="peerlist" className="flex items-center gap-2">
                    <Globe className="h-4 w-4" />
                    peerlist
                  </Label>
                  {isEditing ? (
                    <Input
                      id="peerlist"
                      value={formData.peerlist}
                      onChange={(e) => setFormData({ ...formData, peerlist: e.target.value })}
                      placeholder="username"
                      className="bg-white/50 backdrop-blur-sm border-discord-light focus:border-discord focus:ring-discord"
                    />
                  ) : (
                    <a
                      href={user?.peerlist || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-gray-600 max-w-[180px] truncate hover:underline"
                      title={user?.peerlist}
                    >
                      {user?.peerlist || "Not set"}
                    </a>
                  )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
