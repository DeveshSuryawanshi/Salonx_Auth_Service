import { connectToMongoDB } from '@DeveshSuryawanshi/salonx_infra_service';
import { Logger } from '@DeveshSuryawanshi/salonx_infra_service';

const connection = async(req, res, next) => {
  const tenant = req.headers['x-tenant']; // Extract tenant from custom header
  
  if (!tenant) {
    Logger.error('Tenant identifier missing in request');
    return res.status(400).json({ error: 'Tenant identifier is required' });
  }
  
  try {
    req.dbConnection = await connectToMongoDB(tenant); // Establish tenant connection
    console.log(tenant);
    Logger.info(`Database connection established for tenant: ${tenant}`);
    next(); // Proceed to the next middleware/route handler
  } catch (error) {
    Logger.error(`Failed to connect to tenant ${tenant}:`, error);
    res.status(500).json({ error: 'Database connection failed' });
  }
}

export default connection;