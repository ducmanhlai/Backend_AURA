import { Controller, Get } from "@nestjs/common";
import { AdminService } from "./admin.service";

@Controller('/api/admin/')
export class AdminController{
    constructor(private readonly adminService: AdminService){}
    @Get('get_revenue')
    async GetRevenue() {
     return await this.adminService.getTotalRevenue()
    }
    @Get('get_real_revenue')
    async GetRealRevenue(){
        return await this.adminService.getRealRevenue()
    }
    @Get('get_revenue_branch')
    async GetRevenueBranch(){
        return await this.adminService.getRevenueBranch()
    }
    @Get('get_top_sellers')
    async GetTopSellers(top: number){
        return await this.adminService.getTopSellers(5)
    }
    @Get('get_top_customers')
    async GetTopCustomers(top: number){
        return await this.adminService.getTopCustomers(5)
    }
    @Get('get_top_services')
    async GetTopServices(top: number){
        return await this.adminService.getTopServices(5)
    }
}