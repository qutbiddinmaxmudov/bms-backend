import checkAccess from '.';

describe('checkAccess', () => {
  it('should return true if the user has the required access level', () => {
    expect(checkAccess('admin', 'member')).toBe(true);
    expect(checkAccess('admin', 'admin')).toBe(true);
    expect(checkAccess('owner', 'member')).toBe(true);
    expect(checkAccess('owner', 'owner')).toBe(true);
    expect(checkAccess('member', 'member')).toBe(true);
  });

  it('should return false if the user does not have the required access level', () => {
    expect(checkAccess('member', 'admin')).toBe(false);
    expect(checkAccess('member', 'owner')).toBe(false);
    expect(checkAccess('owner', 'admin')).toBe(false);
    expect(checkAccess('member', 'owner')).toBe(false);
  });
});
