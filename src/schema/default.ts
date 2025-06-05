/**
 * Creates a default user for audit fields when no real user data is available
 * Should be replaced with actual user authentication data in production
 */
export const getDefaultUser = () => ({
  id: "system-default",
  name: "System",
  image: "/placeholder-avatar.png",
})
