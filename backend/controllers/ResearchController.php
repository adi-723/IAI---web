
<?php

require_once __DIR__ . "/../repositories/ResearchRepository.php";

class ResearchController
{
    private $repository;

    public function __construct()
    {
        $this->repository = new ResearchRepository();
    }

    private function getLanguage()
    {
        $language = $_GET["language"] ?? "es";

        if (!in_array($language, ["es", "en"], true)) {
            $language = "es";
        }

        return $language;
    }

    public function getAll()
    {
        $language = $this->getLanguage();

        return $this->repository->getAll($language);
    }

    public function getOne()
    {
        $slug = trim($_GET["slug"] ?? "");

        if ($slug === "") {
            throw new InvalidArgumentException(
                "Research group slug is required."
            );
        }

        $language = $this->getLanguage();

        return $this->repository->getOne($slug, $language);
    }
}