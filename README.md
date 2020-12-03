# Pointer Lock Controls Offset Example

This repo provides an example of how to use mouse offsets with pointer lock controls with Three Fiber.

Normally, when raycasting for pointer events, the raycast occurs from the offset of the mouse and camera.

However, when using a PointerLockControl, the offset should be disregarded, as the mouse position does _not_ change. This can cause issues unless the mouse is set to the middle of the canvas before entering the pointer lock.

By setting the offset to be the middle of the canvas, the offset is ignored, and the raycasts operate as expected.