<?php

require_once __DIR__ . "/../repositories/NewsRepository.php";

class NewsController
{
    private $repository;

    public function __construct()
    {
        $this->repository = new NewsRepository();
    }

    public function getAll($language = "es")
    {
        return $this->repository->getAll($language);
    }

    public function getOne($id, $language = "es")
    {
        return $this->repository->getOne($id, $language);
    }

    public function create($data)
    {
        return $this->repository->create($data);
    }

    public function update($id, $data)
    {
        return $this->repository->update($id, $data);
    }

    public function delete($id)
    {
        return $this->repository->delete($id);
    }
}