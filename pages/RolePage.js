import { BasePage } from "./BasePage";
import { MultiSelectField } from "../components/MultiSelectField";
import { TextField } from "../components/TextField";
import { FormComposite } from "../components/FormComposite";

export class RolePage extends BasePage {
  constructor(page) {
    super(page);
    this.saveAndContinueButton = page.getByRole("button", {
      name: /save and continue/i,
    });

    this.form = new FormComposite({
      position: new TextField(
        page,
        page.locator("#position"),
        this.getFieldError("position"),
      ),
      desiredRoles: new MultiSelectField(
        page,
        "Desired roles",
        page.locator('[class*="icon-plus"]'),
        this.getFieldError("specializations"),
      ),
      coreSkills: new MultiSelectField(
        page,
        "Core technical skills Select",
        undefined,
        this.getFieldError("technologies"),
      ),
    });
  }

  async fillPosition(position) {
    await this.form.fields.position.fill(position);
  }

  async selectDesiredRole(role) {
    await this.form.fields.desiredRoles.fill(role);
  }

  async addCoreSkill(skillName) {
    await this.form.fields.coreSkills.fill([skillName]);
  }

  async fillAll({ position, desiredRoles, coreSkills }) {
    await this.form.fillAll({ position, desiredRoles, coreSkills });
  }

  async submit() {
    await this.saveAndContinueButton.click();
  }

  positionError() {
    return this.form.fields.position.getError();
  }

  desiredRolesError() {
    return this.form.fields.desiredRoles.getError();
  }

  coreSkillsError() {
    return this.form.fields.coreSkills.getError();
  }
}
