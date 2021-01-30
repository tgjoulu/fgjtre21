import { BodyType } from 'matter';

export class PhysicGraphics extends Phaser.GameObjects.Graphics {
    body: Phaser.Physics.Arcade.Body | Phaser.Physics.Arcade.StaticBody;
}
