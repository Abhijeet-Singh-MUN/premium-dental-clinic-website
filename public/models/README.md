# Dental 3D Asset Notes

The hero uses `articular-disc-tmj-optimized.glb` when available and falls back to a bespoke procedural React Three Fiber dental model while loading or if the GLB fails.

Source model:

- **Articular Disc (TMJ)** by University of Dundee, School of Dentistry  
  URL: https://sketchfab.com/3d-models/articular-disc-tmj-a2c3d9bd82274fa187ee482bbe750d78  
  License: CC-BY-4.0  
  Local source: `articular-disc-tmj-source.glb`  
  Local production copy: `articular-disc-tmj-optimized.glb`

The material styling in `components/HeroVisual.jsx` intentionally overrides the original anatomical textures to create a calmer clinic-brand visual: pearl enamel teeth, frosted ivory bone, and translucent teal TMJ/disc accents.

Recommended real GLB replacement candidates:

- **Free Teeth Base Mesh** by ferrumiron6 on Sketchfab  
  URL: https://sketchfab.com/3d-models/free-teeth-base-mesh-b66fde0dc3eb44b0908096aa51b96431  
  Format listed: GLB / FBX / OBJ  
  License shown: Creative Commons Attribution

- **Human Teeth** by Alexander Antipov on Sketchfab  
  URL: https://sketchfab.com/3d-models/human-teeth-c4c569f0e08948e2a572007a7a5726f2  
  License shown: Creative Commons Attribution

- **Dentist, Tooth, Odontology** on Pixabay  
  URL: https://pixabay.com/3d-models/dentist-tooth-odontology-whitening-1963/  
  Format listed: GLB  
  License shown: Pixabay Content License

Sketchfab's automated download API requires authentication, so download the chosen asset manually, place the `.glb` file in this folder, and replace the procedural model in `components/HeroVisual.jsx` with a `useGLTF("/models/name.glb")` loader when ready.
