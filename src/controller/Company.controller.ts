import { CompanyService } from "../service/Company.service";
import { Request, Response } from "express";
import { CompanyDocument } from "../interface/Company.interface";

export class CompanyController {
  private readonly companyService = new CompanyService();

  /**
   * @description Method for creating a new company.
   * @param req Express request object.
   * @param res Express response object.
   * @returns Promise<void>
   */
  public findAll = async (req: Request, res: Response): Promise<void>  => {
    let companies: CompanyDocument[] = [];
    
    if (req?.query?.textForSearch) {
      const params: any = {
        $and: [
          {
            $or: [
              { name: { $regex: req.query?.textForSearch, $options: "i" } },
              { phone: { $regex: req.query?.textForSearch, $options: "i" } },
              { email: { $regex: req.query?.textForSearch, $options: "i" } },
            ]
          },
          {
            $or: [
              { isDeleted: false },
              { isDeleted: { $exists: false } }
            ]
          }
        ]
      };
      companies = await this.companyService.findByParams(params);
      res.json(companies);

      return;
    }
    companies = await this.companyService.findAll();
    res.json(companies);
  }

  /**
   * @description Method for creating a new company.
   * @param req Express request object.
   * @param res Express response object.
   * @returns Promise<void>
   */
  public create = async (req: Request, res: Response): Promise<void> => {
    if(!req.params) {
      res.status(400).json({ message: "Body is required" });
      return;
    } else{
      const company = await this.companyService.createCompany(req.body);
      res.status(201).json(company);
    }
  }

  /**
   * @description Method for deleting a company.
   * @param req Express request object.
   * @param res Express response object.
   * @returns Promise<void>
   */
  public delete = async (req: Request, res: Response): Promise<void> => {
    if(!req.params?.id) {
      res.status(400).json({ message: "Id is required" });
      return;
    } else{
      const company = await this.companyService.deleteCompany(req.params?.id.toString());
      res.status(200).json(company);
    }
  }

  /**
   * @description Method for updating a company.
   * @param req Express request object.
   * @param res Express response object.
   * @returns Promise<void>
   */
  public update = async (req: Request, res: Response): Promise<void> => {
    if(!req.body || !req.params?.id) {
      res.status(400).json({ message: "Body and id are required" });
      return;
    } else{
      const company = await this.companyService.updateCompany(req.body, req.params.id.toString());
      res.status(200).json(company);
    }
  }

}
