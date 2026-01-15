import multer from "multer";
import fs from "fs";
import path from "path";

export const storage = multer.diskStorage({
    destination: (req, _file, cb) => {
        try {
            const method = req.method;
            const { name = "" } = JSON.parse(req.body.data);

            if (name === "") {
                return cb(new Error('Name is required'), '');
            }

            const baseDir = path.join(process.cwd(), "uploads");
            let destDir: string;

            if (method === 'POST') {
                // POST: Crear directamente en su ubicación final
                const nameDir = name.toLowerCase().replace(/ /g, "-");
                destDir = path.join(baseDir, "competitions", nameDir);
            } else if (method === 'PUT') {
                // PUT: Subir a carpeta temporal
                destDir = path.join(baseDir, "tmp");
            } else {
                return cb(new Error('Method not allowed'), '');
            }

            if (!fs.existsSync(destDir)) {
                fs.mkdirSync(destDir, { recursive: true });
            }

            cb(null, destDir);
        } catch (err) {
            cb(err as Error, '');
        }
    },

    filename: (req, file, cb) => {
        try {
            const method = req.method;
            const { name = "" } = JSON.parse(req.body.data);

            if (name === "") {
                return cb(new Error('Name is required'), '');
            }

            const nameDir = name.toLowerCase().replace(/ /g, "-");
            const ext = path.extname(file.originalname);

            if (method === 'PUT') {
                // PUT: Nombre único temporal para evitar colisiones
                const timestamp = Date.now();
                const projectId = req.params.projectId || 'unknown';
                cb(null, `${projectId}-${nameDir}-${timestamp}${ext}`);
            } else {
                // POST: Nombre definitivo
                cb(null, `${nameDir}-logo${ext}`);
            }
        } catch (err) {
            cb(err as Error, "");
        }
    }
});

export const upload = multer({ storage });