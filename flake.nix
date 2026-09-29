{
  description = "Development environment for the Rick and Morty frontend";

  inputs.nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";

  outputs = { nixpkgs, ... }:
    let
      systems = [ "x86_64-linux" "aarch64-linux" "x86_64-darwin" "aarch64-darwin" ];
      forAllSystems = nixpkgs.lib.genAttrs systems;
    in
    {
      devShells = forAllSystems (
        system:
        let
          pkgs = nixpkgs.legacyPackages.${system};
        in
        {
          default = pkgs.mkShell {
            packages = [ pkgs.nodejs_24 ];

            shellHook = ''
              echo "Rick and Morty development shell"
              echo "  npm install    Install dependencies"
              echo "  npm run dev    Start the development server"
              echo "  npm run build  Create a production build"
            '';
          };
        }
      );
    };
}
