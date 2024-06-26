import { Controller, Get } from "@nestjs/common";

@Controller('/api/admin')
export class AdminController{
    @Get()
    init() {
        return 1
    }
}