export function profileCON(profile: any[], newprofile: any) {
  profile.push(newprofile);
  return { msg: "profile created successfully" };
}
