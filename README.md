# Pointer Lock Controls Offset Example

This repo provides an example of how to use mouse offsets with pointer lock controls with Three Fiber.

Normally, when raycasting for pointer events, the raycast occurs from the offset of the mouse and camera.

However, when using a PointerLockControl, the offset should be disregarded, as the mouse position does _not_ change. This can cause issues unless the mouse is set to the middle of the canvas before entering the pointer lock.

By setting the offset to be the middle of the canvas, the offset is ignored, and the raycasts operate as expected.

This is demo'd here by having the raycasted mouse location tracked with a `red circle`, and the expected raycast location tracked with a `black reticle`.

## Without Offsetting

![Without Offsetting](readmeAssets/withoutOffsetting2.gif)

## With Offsetting

![With Offsetting](readmeAssets/withOffsetting2.gif)

