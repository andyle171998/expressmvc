import * as shell from "shelljs";

shell.cp( "-R", "src/views", "dist/" );
shell.cp( "-R", "src/common", "dist/" );
shell.cp( "-R", "src/locales", "dist/" );