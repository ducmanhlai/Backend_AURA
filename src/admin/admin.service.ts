import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InjectConnection } from '@nestjs/typeorm';
import { Connection } from 'typeorm';

@Injectable()
export class AdminService {
  constructor(
    @InjectConnection() private readonly connection: Connection,
  ) { }
  async getTotalRevenue(): Promise<number> {
    const result = await this.connection.query(`
          SELECT SUM(tmp.total_quantity * services.price) AS total_revenue
          FROM (
              SELECT service_id, SUM(quantity) AS total_quantity
              FROM bookings
              GROUP BY service_id
          ) AS tmp
          JOIN services ON services.id = tmp.service_id;
        `);
    return result[0]?.total_revenue || 0;
  }
  async getRealRevenue(): Promise<number> {
    const result = await this.connection.query(`
        SELECT SUM(customer_paid) AS total
        FROM bookings
      `);
    return result[0]?.total_revenue || 0;
  }
  async getRevenueBranch(): Promise<any> {
    const result = await this.connection.query(`
    select clinics.name,
    sum(tmp.quantity*price) as total,
    sum(ctmp)
    from
    (SELECT clinic_id,sum(quantity) as quantity,service_id, sum(customer_paid) as ctmp
    FROM bookings
    GROUP BY clinic_id, service_id) as tmp
    join clinics on tmp.clinic_id = clinics.id
    join services on services.id = service_id
    GROUP BY clinics.name
  `);
    return result || [];
  }
  async getTopSellers(top:number): Promise<any> {
    const result = await this.connection.query(`
    SELECT full_name, quantity
    from
    (select seller_id,count(id) as quantity
    from bookings
    GROUP BY seller_id
    ORDER BY quantity DESC
    LIMIT ${top}
    ) as TEMP 
    join staffs on seller_id = staffs.id
    ORDER BY quantity DESC;
    `);
    return result || [];
  }
  async getTopCustomers(top: number): Promise<any>{
    const result = await this.connection.query(`
    select full_name,
    sum(tmp.quantity*price) as total,
    sum(ctmp)
    from
    (SELECT customer_id,sum(quantity) as quantity,service_id, sum(customer_paid) as ctmp
    FROM bookings
    GROUP BY customer_id, service_id) as tmp
    join services on services.id = service_id
    join customers on tmp.customer_id = customers.id
    GROUP BY full_name
    ORDER BY total DESC
    LIMIT ${top}
    `);
    return result || [];
  }
  async getTopServices(top: number): Promise<any>{
    const result = await this.connection.query(`
    SELECT services.name,quantity
    from
    (select service_id,sum(quantity) as quantity
    from bookings
    GROUP BY service_id
    ORDER BY quantity DESC
    LIMIT ${top}
    ) as TEMP 
    join services on service_id = services.id
    ORDER BY quantity DESC;
    `);
    return result || [];
  }
}