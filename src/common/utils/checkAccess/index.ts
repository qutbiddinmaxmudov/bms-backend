const ACCESS_LEVELS = {
  admin: 2,
  owner: 1,
  member: 0,
} as const;

type accessTypes = keyof typeof ACCESS_LEVELS;

const checkAccess = (level: accessTypes, required: accessTypes): boolean => {
  return ACCESS_LEVELS[level] >= ACCESS_LEVELS[required];
};

export default checkAccess;
