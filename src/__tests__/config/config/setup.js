import initializeDatabase from '@/utils/config-database';
import sequelize from '@/utils/sequelize-config';


describe("Server tests", () => {
  test("Server is running", async () => {});
});


jest.mock('@/utils/sequelize-config', () => ({
  authenticate: jest.fn()
}));

describe('initializeDatabase', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return true when the database connection is successful', async () => {
    sequelize.authenticate.mockResolvedValue(true);

    const result = await initializeDatabase();

    expect(sequelize.authenticate).toHaveBeenCalledTimes(1);
    expect(result).toBe(true);
    // Optionally check console output if needed
  });

  it('should return an error when the database connection fails', async () => {
    const mockError = new Error('Connection error');
    sequelize.authenticate.mockRejectedValue(mockError);

    const result = await initializeDatabase();

    expect(sequelize.authenticate).toHaveBeenCalledTimes(1);
    expect(result).toBe(mockError);
    // Optionally check console output if needed
  });
});
